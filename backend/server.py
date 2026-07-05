from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re
from urllib.parse import quote_plus, urlparse, urlunparse, unquote


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

def encode_mongo_url(url: str) -> str:
    """URL-encode special characters in MongoDB URI credentials (RFC 3986)."""
    parsed = urlparse(url)
    if parsed.username or parsed.password:
        username = quote_plus(unquote(parsed.username or ""))
        password = quote_plus(unquote(parsed.password or ""))
        # Reconstruct netloc with encoded credentials
        host = parsed.hostname
        if parsed.port:
            host = f"{host}:{parsed.port}"
        netloc = f"{username}:{password}@{host}"
        parsed = parsed._replace(netloc=netloc)
    return urlunparse(parsed)

mongo_url = encode_mongo_url(os.environ['MONGO_URL'])
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Studio Form API")
api_router = APIRouter(prefix="/api")


# ===== Models =====
class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    interest: Optional[str] = None
    message: str
    source: str = "contact"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    interest: Optional[str] = None
    message: str
    source: Optional[str] = "contact"

    @validator("phone")
    def validate_phone(cls, v):
        if v is None:
            return v
        if not re.fullmatch(r"^\+?\d{7,15}$", v):
            raise ValueError("Invalid phone number format. Use digits, optional leading '+', 7-15 characters.")
        return v

class Subscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class SubscribeCreate(BaseModel):
    email: EmailStr


# ===== Catalog data (seeded from server, also available via API) =====
PRODUCTS = [
    {"id": "p-01", "name": "MedFlow AI", "category": "Healthcare", "status": "Live", "description": "AI-powered clinical documentation, prescription parsing, and patient triage for hospitals.", "tags": ["EMR", "Triage", "Voice"]},
    {"id": "p-02", "name": "LogiPilot", "category": "Logistics & Transport", "status": "Live", "description": "Route optimization and fleet copilot — predicts delays, reassigns loads in real time.", "tags": ["Routing", "Fleet", "Predictive"]},
    {"id": "p-03", "name": "AeroDesk AI", "category": "Aviation & Travel", "status": "Live", "description": "Autonomous airline ops desk — disruption handling, crew rosters, passenger reaccommodation.", "tags": ["Ops", "IROPS"]},
    {"id": "p-04", "name": "EstateBrain", "category": "Real Estate", "status": "Live", "description": "Listing intelligence, lead qualifier, and virtual site-visit agent for property developers.", "tags": ["CRM", "Leads"]},
    {"id": "p-05", "name": "FinForge", "category": "Finance & Ops", "status": "Live", "description": "AR/AP automation, invoice extraction, and CFO copilot built on domain LLMs.", "tags": ["AR/AP", "Audit"]},
    {"id": "p-06", "name": "EduMentor", "category": "Education", "status": "Live", "description": "AI tutor that adapts to each student. Multi-language, assessment-driven, NEP-aligned.", "tags": ["K12", "Adaptive"]},
    {"id": "p-07", "name": "LegalOwl", "category": "Legal", "status": "Beta", "description": "Contract review, clause extraction, and litigation research for Indian and global law firms.", "tags": ["Contracts"]},
    {"id": "p-08", "name": "HirePulse", "category": "HR & Recruitment", "status": "Live", "description": "Resume screening, interview transcript scoring, and culture-fit prediction.", "tags": ["ATS"]},
    {"id": "p-09", "name": "ChefStack", "category": "Food & Lifestyle", "status": "Live", "description": "Menu optimizer, demand forecasting, and AI ordering agent for cloud kitchens.", "tags": ["F&B"]},
    {"id": "p-10", "name": "ShopAgent", "category": "Automation & Workflows", "status": "Live", "description": "Conversational commerce — WhatsApp & web agent that closes orders, handles refunds.", "tags": ["Commerce"]},
    {"id": "p-11", "name": "DataLens", "category": "Data & Analytics", "status": "Live", "description": "Natural-language BI — ask in English, get dashboards from your warehouse.", "tags": ["BI", "NL2SQL"]},
    {"id": "p-12", "name": "FleetVision", "category": "Vehicle & Auto", "status": "Live", "description": "Vision-based dashcam analytics, accident detection, driver scoring for auto fleets.", "tags": ["Vision"]},
    {"id": "p-13", "name": "AgriSense", "category": "AI Tools & Platforms", "status": "Beta", "description": "Satellite + ground-sensor AI for crop yield, irrigation, pest detection.", "tags": ["GeoAI"]},
    {"id": "p-14", "name": "RetailMind", "category": "Data & Analytics", "status": "Live", "description": "Shelf intelligence, planogram compliance, demand forecasting for FMCG.", "tags": ["CV", "Demand"]},
    {"id": "p-15", "name": "VoiceOps", "category": "AI Tools & Platforms", "status": "Live", "description": "End-to-end voice agent platform — telephony, NLU, IVR replacement.", "tags": ["Voice", "PBX"]},
    {"id": "p-16", "name": "ClaimGuard", "category": "Finance & Ops", "status": "Live", "description": "Insurance claim triage, fraud detection, and adjuster copilot.", "tags": ["Insurance"]},
    {"id": "p-17", "name": "TransitAI", "category": "Logistics & Transport", "status": "Live", "description": "Public transit ridership forecast and dynamic dispatch.", "tags": ["Transit"]},
    {"id": "p-18", "name": "CarePath", "category": "Healthcare", "status": "Beta", "description": "Chronic care management agent that calls patients, logs vitals, escalates risks.", "tags": ["Chronic"]},
    {"id": "p-19", "name": "BrandLoop", "category": "AI Tools & Platforms", "status": "Live", "description": "Brand monitoring, social listening, and content agent for marketing teams.", "tags": ["Marketing"]},
    {"id": "p-20", "name": "CampusOS", "category": "Education", "status": "Live", "description": "End-to-end campus operating system — admissions, attendance, fee, mentorship.", "tags": ["EdOps"]},
    {"id": "p-21", "name": "TalentLens", "category": "HR & Recruitment", "status": "Live", "description": "Workforce planning, skills graph, and internal mobility recommender.", "tags": ["HR"]},
    {"id": "p-22", "name": "PilotChat", "category": "Aviation & Travel", "status": "Beta", "description": "Multilingual airport assistant kiosk — info, wayfinding, complaint capture.", "tags": ["Kiosk"]},
    {"id": "p-23", "name": "PropScan", "category": "Real Estate", "status": "Live", "description": "Document intelligence — title deeds, RERA filings, OCR + entity extraction.", "tags": ["DocAI"]},
    {"id": "p-24", "name": "EnergyGrid AI", "category": "AI Tools & Platforms", "status": "Beta", "description": "Load forecasting, demand response, and predictive maintenance for power utilities.", "tags": ["Utilities"]},
]

VOICE_AGENTS = [
    {"id": "v-01", "name": "Inbound Reception Agent", "industry": "Healthcare", "type": "Inbound", "languages": ["English", "Hindi", "Marathi"], "description": "Books appointments, answers FAQs, routes urgent cases to staff 24/7."},
    {"id": "v-02", "name": "Outbound Lead Qualifier", "industry": "Real Estate", "type": "Outbound", "languages": ["English", "Hindi"], "description": "Calls leads from CRM, qualifies budget/location, schedules site visits."},
    {"id": "v-03", "name": "Order Confirmation Bot", "industry": "E-commerce", "type": "Outbound", "languages": ["English", "Hindi", "Tamil"], "description": "Confirms COD orders, reduces RTO by up to 40%."},
    {"id": "v-04", "name": "Patient Follow-up Agent", "industry": "Healthcare", "type": "Outbound", "languages": ["English", "Hindi", "Bengali"], "description": "Post-discharge checkups, medication adherence, vitals logging."},
    {"id": "v-05", "name": "Logistics Dispatch Agent", "industry": "Logistics", "type": "Inbound", "languages": ["English", "Hindi", "Punjabi"], "description": "Driver check-ins, POD capture, exception routing."},
    {"id": "v-06", "name": "Loan Collection Agent", "industry": "BFSI", "type": "Outbound", "languages": ["English", "Hindi", "Telugu"], "description": "Polite, compliance-grade recovery calls with payment links."},
    {"id": "v-07", "name": "Restaurant Reservation Agent", "industry": "Food & Hospitality", "type": "Inbound", "languages": ["English", "Hindi"], "description": "Books tables, handles cancellations, manages waitlist."},
    {"id": "v-08", "name": "Airline Disruption Agent", "industry": "Aviation", "type": "Outbound", "languages": ["English", "Hindi"], "description": "Notifies passengers of delays, offers rebooking, processes vouchers."},
    {"id": "v-09", "name": "Hotel Concierge Agent", "industry": "Hospitality", "type": "Inbound", "languages": ["English", "Hindi", "French"], "description": "Room service, housekeeping, local guidance — multilingual."},
    {"id": "v-10", "name": "EdTech Counselor Bot", "industry": "Education", "type": "Outbound", "languages": ["English", "Hindi", "Tamil"], "description": "Counsels course enquirers, books demos, follows up on fees."},
    {"id": "v-11", "name": "Property Site-Visit Scheduler", "industry": "Real Estate", "type": "Outbound", "languages": ["English", "Hindi", "Gujarati"], "description": "Books site visits, sends maps, reminds and reschedules."},
    {"id": "v-12", "name": "HR Screening Voice Agent", "industry": "HR", "type": "Outbound", "languages": ["English", "Hindi"], "description": "First-round phone screen — JD fit, salary, notice period."},
    {"id": "v-13", "name": "Insurance Renewal Agent", "industry": "BFSI", "type": "Outbound", "languages": ["English", "Hindi", "Kannada"], "description": "Reminds, explains, sends payment links, books advisor calls."},
    {"id": "v-14", "name": "Govt Citizen Helpline", "industry": "Government", "type": "Inbound", "languages": ["English", "Hindi", "Marathi", "Telugu"], "description": "Scheme info, complaint registration, ticketing in 4 languages."},
    {"id": "v-15", "name": "Clinic Reminder Agent", "industry": "Healthcare", "type": "Outbound", "languages": ["English", "Hindi"], "description": "Confirms appointments, reduces no-shows by 35%."},
    {"id": "v-16", "name": "Logistics POD Confirmation", "industry": "Logistics", "type": "Outbound", "languages": ["English", "Hindi"], "description": "Calls consignees, confirms delivery, captures feedback."},
]

COURSES = [
    {"id": "c-01", "name": "Foundations of Agentic AI", "category": "Course", "level": "Beginner", "duration": "8 weeks", "description": "Learn how autonomous agents reason, plan, and act. Hands-on with frameworks like LangGraph and CrewAI."},
    {"id": "c-02", "name": "Voice AI Engineering", "category": "Course", "level": "Intermediate", "duration": "10 weeks", "description": "Build production-grade voice agents — ASR, TTS, NLU, telephony integration."},
    {"id": "c-03", "name": "Domain LLMs from Scratch", "category": "Course", "level": "Advanced", "duration": "12 weeks", "description": "Train and fine-tune domain-specific LLMs for healthcare, legal, finance."},
    {"id": "c-04", "name": "AI Automation for Business", "category": "Workshop", "level": "Beginner", "duration": "2 days", "description": "No-code agent workflows. n8n, Make, Zapier + LLM integrations."},
    {"id": "c-05", "name": "Computer Vision Bootcamp", "category": "Course", "level": "Intermediate", "duration": "8 weeks", "description": "YOLOv10, segmentation, real-time inference, edge deployment."},
    {"id": "c-06", "name": "Enterprise AI Strategy", "category": "Seminar", "level": "Executive", "duration": "1 day", "description": "Board-level AI roadmap, ROI, risk, and governance."},
    {"id": "c-07", "name": "RAG Mastery", "category": "Course", "level": "Intermediate", "duration": "6 weeks", "description": "Retrieval augmented generation — chunking, rerankers, evals, hybrid search."},
    {"id": "c-08", "name": "Claude Skills Engineering", "category": "Workshop", "level": "Advanced", "duration": "3 days", "description": "Build custom Claude skill packs for enterprise automation."},
    {"id": "c-09", "name": "AI for College Faculty", "category": "Seminar", "level": "Intermediate", "duration": "1 day", "description": "How to teach AI, build curricula, and run AI labs in your college."},
    {"id": "c-10", "name": "Data Engineering for LLMs", "category": "Course", "level": "Intermediate", "duration": "8 weeks", "description": "Pipelines, vector DBs, embeddings, observability."},
    {"id": "c-11", "name": "AI Safety & Governance", "category": "Seminar", "level": "Executive", "duration": "1 day", "description": "Policy, evals, red-teaming, DPDP & EU AI Act compliance."},
    {"id": "c-12", "name": "AI Product Management", "category": "Course", "level": "Intermediate", "duration": "6 weeks", "description": "Specifying, shipping, and measuring AI features."},
    {"id": "c-13", "name": "School AI Club Starter", "category": "Workshop", "level": "Beginner", "duration": "1 day", "description": "Run a school AI club — projects, judging, mentorship."},
    {"id": "c-14", "name": "MLOps in Production", "category": "Course", "level": "Advanced", "duration": "8 weeks", "description": "CI/CD, monitoring, drift, A/B for ML and LLM systems."},
]


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"service": "Studio Form API", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"status": "operational", "ts": datetime.now(timezone.utc).isoformat()}


@api_router.get("/products")
async def get_products(category: Optional[str] = None, q: Optional[str] = None):
    items = PRODUCTS
    if category and category.lower() != "all":
        items = [p for p in items if p["category"].lower() == category.lower()]
    if q:
        ql = q.lower()
        items = [p for p in items if ql in p["name"].lower() or ql in p["description"].lower() or ql in p["category"].lower()]
    return {"count": len(items), "items": items}


@api_router.get("/voice-agents")
async def get_voice_agents(industry: Optional[str] = None, type: Optional[str] = None, q: Optional[str] = None):
    items = VOICE_AGENTS
    if industry and industry.lower() != "all":
        items = [v for v in items if v["industry"].lower() == industry.lower()]
    if type and type.lower() != "all":
        items = [v for v in items if v["type"].lower() == type.lower()]
    if q:
        ql = q.lower()
        items = [v for v in items if ql in v["name"].lower() or ql in v["description"].lower()]
    return {"count": len(items), "items": items}


@api_router.get("/courses")
async def get_courses(category: Optional[str] = None, level: Optional[str] = None, q: Optional[str] = None):
    items = COURSES
    if category and category.lower() != "all":
        items = [c for c in items if c["category"].lower() == category.lower()]
    if level and level.lower() != "all":
        items = [c for c in items if c["level"].lower() == level.lower()]
    if q:
        ql = q.lower()
        items = [c for c in items if ql in c["name"].lower() or ql in c["description"].lower()]
    return {"count": len(items), "items": items}

def send_email_notification(lead: Lead):
    import os
    import requests

    smtp_host = os.getenv("SMTP_HOST", "")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASSWORD", "")
    smtp_from = os.getenv("SMTP_FROM", "info@studioform.app")
    smtp_internal_to = os.getenv("SMTP_TO", "info@studioform.app")

    resend_key = os.getenv("RESEND_API_KEY", "")
    resend_from = os.getenv("RESEND_FROM", "onboarding@resend.dev")

    # ---------- Internal notification email (HTML) ----------
    internal_subject = f"New Lead: {lead.name} ({lead.company or 'No Company'})"
    internal_body_html = f"""
    <html>
      <body style='font-family: Arial, sans-serif; line-height: 1.5;'>
        <h2>New Lead Received</h2>
        <table cellpadding='4' cellspacing='0' style='border: 1px solid #ddd;'>
          <tr><td><strong>Name:</strong></td><td>{lead.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{lead.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>{lead.phone or 'n/a'}</td></tr>
          <tr><td><strong>Company:</strong></td><td>{lead.company or 'n/a'}</td></tr>
          <tr><td><strong>Interest:</strong></td><td>{lead.interest or 'n/a'}</td></tr>
          <tr><td><strong>Message:</strong></td><td>{lead.message}</td></tr>
          <tr><td><strong>Token ID:</strong></td><td>{lead.id}</td></tr>
        </table>
      </body>
    </html>
    """

    # ---------- Confirmation email to the lead (HTML) ----------
    user_subject = "Thank you for contacting Studio Form"
    user_body_html = f"""
    <html>
      <body style='font-family: Arial, sans-serif; line-height: 1.5;'>
        <p>Hi {lead.name},</p>
        <p>Thank you for reaching out to us. We have received your inquiry and our team will get back to you shortly.</p>
        <p><strong>Your reference token ID is:</strong> {lead.id}</p>
        <p>Best regards,<br/>Studio Form Team</p>
      </body>
    </html>
    """

    # Log the composed HTML (for debugging)
    print(f"[Email Notification Log] Internal Email\nFrom: {smtp_from}\nTo: {smtp_internal_to}\nSubject: {internal_subject}\n\n{internal_body_html}")
    print(f"[Email Notification Log] User Confirmation Email\nFrom: {smtp_from}\nTo: {lead.email}\nSubject: {user_subject}\n\n{user_body_html}")

    # ===== Option 1: Send via Resend HTTP API (if key is provided) =====
    if resend_key:
        headers = {
            "Authorization": f"Bearer {resend_key}",
            "Content-Type": "application/json",
        }
        
        # Send internal lead notification to owner
        try:
            r1 = requests.post(
                "https://api.resend.com/emails",
                headers=headers,
                json={
                    "from": resend_from,
                    "to": smtp_internal_to,
                    "subject": internal_subject,
                    "html": internal_body_html,
                },
                timeout=10
            )
            if r1.status_code in [200, 201]:
                print(f"[Resend Notification] Internal email sent successfully: {r1.text}")
            else:
                print(f"[Resend Notification Error] Internal email failed. Status: {r1.status_code}, Response: {r1.text}")
        except Exception as e:
            print(f"[Resend Notification Exception] Failed to send internal email: {e}")
            
        # Send user confirmation email (only if domain is verified, as onboarding@resend.dev has recipient restrictions)
        if resend_from == "onboarding@resend.dev":
            print("[Resend Notification] Using 'onboarding@resend.dev'. Skipping sending confirmation email to lead to avoid Resend free tier restrictions.")
        else:
            try:
                r2 = requests.post(
                    "https://api.resend.com/emails",
                    headers=headers,
                    json={
                        "from": resend_from,
                        "to": lead.email,
                        "subject": user_subject,
                        "html": user_body_html,
                    },
                    timeout=10
                )
                if r2.status_code in [200, 201]:
                    print(f"[Resend Notification] User confirmation email sent successfully: {r2.text}")
                else:
                    print(f"[Resend Notification Error] User confirmation email failed. Status: {r2.status_code}, Response: {r2.text}")
            except Exception as e:
                print(f"[Resend Notification Exception] Failed to send user confirmation email: {e}")
        return

    # ===== Option 2: Fallback to standard SMTP =====
    import smtplib
    from email.mime.text import MIMEText
    from email.header import Header

    if not smtp_host:
        print("[Email Notification] SMTP_HOST and RESEND_API_KEY not configured. Notification not sent via email (printed above).")
        return

    try:
        def _send(to_addr: str, subject: str, html_body: str):
            msg = MIMEText(html_body, "html", "utf-8")
            msg["Subject"] = Header(subject, "utf-8")
            msg["From"] = smtp_from
            msg["To"] = to_addr
            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
                server.ehlo()
                if smtp_port == 587:
                    server.starttls()
                    server.ehlo()
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_from, [to_addr], msg.as_string())
            server.close()

        _send(smtp_internal_to, internal_subject, internal_body_html)
        _send(lead.email, user_subject, user_body_html)
        print("[Email Notification] Both HTML emails sent successfully via SMTP.")
    except Exception as e:
        print(f"[Email Notification Error] Failed to send email via SMTP: {e}")


@api_router.post("/leads")
async def create_lead(payload: LeadCreate, background_tasks: BackgroundTasks):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    background_tasks.add_task(send_email_notification, lead)
    return {"ok": True, "id": lead.id}


@api_router.post("/subscribe")
async def subscribe(payload: SubscribeCreate):
    sub = Subscriber(email=payload.email)
    existing = await db.subscribers.find_one({"email": payload.email})
    if existing:
        return {"ok": True, "id": existing.get("id"), "duplicate": True}
    await db.subscribers.insert_one(sub.model_dump())
    return {"ok": True, "id": sub.id}


@api_router.get("/stats")
async def get_stats():
    return {
        "projects": 121,
        "voice_agents": 50,
        "courses": 100,
        "industries": 12,
        "models": 4,
        "uptime": 99.97,
        "agents_active": 200,
        "calls_processed_m": 1.0,
        "avg_response_s": 0.42,
    }


app.include_router(api_router)

cors_origins_str = os.environ.get('CORS_ORIGINS', '*')
origins = [o.strip() for o in cors_origins_str.split(',') if o.strip()]
allow_credentials = True

# Add default allowed domains dynamically
default_origins = [
    "https://studioform.app",
    "https://www.studioform.app",
    "https://studio-form.app",
    "https://www.studio-form.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000"
]
for do in default_origins:
    if do not in origins:
        origins.append(do)

if not origins or "*" in origins:
    origins = ["*"]
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_credentials=allow_credentials,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
