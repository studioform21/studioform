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

raw_mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.getenv('DB_NAME', 'studioform_db')

try:
    mongo_url = encode_mongo_url(raw_mongo_url)
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
except Exception as e:
    logging.exception(f"MongoDB connection initialization warning: {e}")
    client = None
    db = None

app = FastAPI(title="Studio Form API")
api_router = APIRouter()

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


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


# ===== Blog Models & Endpoints =====
class BlogPostCreate(BaseModel):
    slug: str
    title: str
    tag: str = "Voice AI"
    date: Optional[str] = None
    readTime: str = "5 min read"
    author: str = "Studio Form Editorial"
    keywords: Optional[str] = ""
    callout: Optional[str] = None
    body: List[str] = []
    sections: List[dict] = []
    published: bool = True
    password: Optional[str] = "admin@1234"


SEED_BLOGS = [
    {
        "id": "b-01",
        "slug": "how-to-build-ai-receptionist",
        "title": "How to Build an AI Receptionist That Actually Works (Without Hiring an Engineering Team)",
        "tag": "Voice AI",
        "date": "Jul 21, 2026",
        "readTime": "8 min read",
        "author": "Studio Form Voice Engineering",
        "keywords": "ai receptionist, voice AI, virtual receptionist, phone automation, ai phone answering, Studio Form",
        "callout": "Quick Summary (AI Overview Box): An AI receptionist is an automated voice AI agent that answers inbound phone calls 24/7, understands conversational intent, books appointments in your CRM/calendar, and escalates complex callers to live staff. Building a production-grade system requires low-latency speech synthesis (<500ms), reliable phone line connectivity, and deep calendar integration—capabilities provided natively by platforms like Studio Form.",
        "body": [
            "If you've searched 'ai receptionist' recently, you've probably landed on two kinds of results: enterprise sales pages that never mention pricing, or DIY tutorials that ask you to wire together five different tools and hope nothing breaks at 2 AM when a real customer calls.",
            "Neither is a great option if you're a clinic, law firm, home services company, or growing SaaS business that just needs your phones answered — every time, correctly, without a human sitting by the line.",
            "According to industry research, over 67% of callers hang up without leaving a message when directed to voicemail. For service businesses, missed calls directly translate to lost revenue. This guide walks through exactly how to build a production-grade AI receptionist, why so many businesses are suddenly searching for this, and how to do it with Studio Form instead of duct-taping it together yourself."
        ],
        "sections": [
            {
                "title": "1. Why 'AI Receptionist' Searches Are Spiking Right Now",
                "content": [
                    "Search demand for AI receptionists isn't coming from Fortune 500 enterprises with dedicated AI teams — it's coming from small and mid-sized businesses realizing that missed calls are missed revenue, and that voice AI has finally gotten good enough to handle real conversations.",
                    "A good example of where this demand is coming from: a solo builder recently documented in a popular automation community how they wired together a working AI voice agent receptionist using workflow tools like n8n, chaining together speech-to-text, an LLM, text-to-speech, and telephony APIs by hand. The build worked — but it also needed constant babysitting: managing API rate limits, handling call transfers, keeping latency low enough that callers didn't feel like they were talking to a laggy bot, and rebuilding the whole flow every time one connected service changed its API."
                ],
                "bullets": [
                    "The demand is real: Business owners are actively trying to solve 'someone needs to answer the phone' with AI, not just chatbots.",
                    "The DIY path is fragile: Stitching together five tools to answer a phone call works as a weekend project. It does not hold up when a real patient, client, or customer calls your business and the call drops or mishears an appointment time."
                ]
            },
            {
                "title": "2. What an AI Receptionist Actually Needs to Do",
                "content": "Before building anything, it helps to define what 'receptionist' actually means in AI terms. A real front-desk person does more than answer questions — they:",
                "bullets": [
                    "Answer every call within a ring or two, 24/7",
                    "Understand context (a returning patient vs. a new lead vs. a vendor)",
                    "Book, reschedule, or cancel appointments in your actual calendar system",
                    "Route urgent calls to a real human immediately with warm live transfers",
                    "Speak naturally with low latency (<500ms), without robotic pauses",
                    "Log every call transcript and audio recording so your team has a record, not a guess"
                ]
            },
            {
                "title": "3. Step-by-Step: Building an AI Receptionist with Studio Form",
                "content": "Here's the practical build process using Studio Form's voice agent infrastructure instead of hand-wiring your own stack:",
                "subsections": [
                    {"subTitle": "Step 1: Define the Call Flows You Need Covered", "text": "Start narrow, not broad. List the actual call types your business gets: New appointment bookings, reschedules & cancellations, FAQs, and urgent escalations."},
                    {"subTitle": "Step 2: Connect Your Existing Systems", "text": "Studio Form connects directly to your scheduling tool, CRM, or practice management system (Google Calendar, Calendly, HubSpot, Salesforce)."},
                    {"subTitle": "Step 3: Train the Voice Agent on Your Business", "text": "Studio Form builds the agent around your actual business: services, tone, and specific guardrails."},
                    {"subTitle": "Step 4: Set Live Escalation Rules", "text": "Configure warm live transfers, SMS alerts to on-call staff, or priority callback queues."},
                    {"subTitle": "Step 5: Test with Real Call Scenarios", "text": "Test against background noise, accents, interruptions, and callers changing their minds."},
                    {"subTitle": "Step 6: Deploy and Monitor", "text": "Port your number or launch a new local line with full transcript logging."}
                ]
            },
            {
                "title": "4. DIY Voice Agent vs. Studio Form: The Real Difference",
                "content": "There is a real gap between getting a voice agent to answer a test call and trusting it to run your front desk every single day.",
                "table": {
                    "headers": ["Feature / Metric", "DIY (n8n / workflow tools)", "Studio Form Platform"],
                    "rows": [
                        ["Setup time", "Days to weeks of manual wiring", "2-3 days, guided setup"],
                        ["Voice Latency", "High / Variable (1.2s - 2.5s)", "Ultra-low (<500ms)"],
                        ["Reliability", "Depends on maintaining 5 connected APIs", "Enterprise 99.9% uptime SLA"],
                        ["Calendar / CRM Integration", "Manual, custom-built per tool", "Native integration out of the box"],
                        ["Escalation handling", "Custom logic you write yourself", "Built-in warm & cold live transfers"],
                        ["Ongoing maintenance", "You fix every break, update, and API change", "Fully managed by Studio Form team"]
                    ]
                }
            },
            {
                "title": "5. Who This Is For",
                "content": "An AI receptionist built this way makes the most sense for:",
                "bullets": [
                    "Healthcare & Dental Practices drowning in appointment calls and no-shows",
                    "Law Firms & Professional Services that lose high-value leads to voicemail",
                    "Home Services Businesses (HVAC, plumbing, electrical) getting calls during jobs",
                    "Growing SaaS & E-Commerce Businesses needing consistent 24/7 phone support"
                ]
            },
            {
                "title": "6. Frequently Asked Questions",
                "faqs": [
                    {"q": "Is an AI receptionist the same as a chatbot?", "a": "No. A chatbot handles text on a website. An AI receptionist is a voice agent that answers real phone calls, understands spoken conversation, and takes real actions like booking appointments."},
                    {"q": "Can it sound natural instead of robotic?", "a": "Yes — voice quality has advanced significantly. Platforms like Studio Form tune the agent's tone, pacing, and vocabulary to match your business."},
                    {"q": "What happens if the AI can't answer a question?", "a": "It escalates based on rules set during setup — transferring to a live team member, sending an SMS alert, or logging a callback request."},
                    {"q": "How long does it take to go live?", "a": "Unlike a hand-built workflow stack, which can take weeks of trial and error, a guided build with Studio Form is typically live within days."}
                ]
            }
        ],
        "published": True
    },
    {
        "id": "b-02",
        "slug": "gpt-5-reasoning-bands",
        "title": "GPT-5 Launches with Reasoning Bands",
        "tag": "Breaking",
        "date": "Feb 8, 2026",
        "readTime": "5 min read",
        "author": "Studio Form Research",
        "keywords": "GPT-5 release, reasoning bands, o1 reasoning, OpenAI, LLM benchmarks, agentic workflows",
        "body": [
            "OpenAI's latest release introduces 'Reasoning Bands'—allowing developers to configure the amount of compute allocated to search and self-correction at inference time.",
            "This marks a major shift from standard next-token predictions, introducing a structured verification loop before output generation."
        ],
        "sections": [
            {"title": "1. What are Inference Reasoning Bands?", "content": "Reasoning bands allow you to specify the maximum reasoning tokens, preventing agents from wasting compute on trivial tasks."},
            {"title": "2. Strategic Impact on Agentic Workflows", "content": "Eliminates the need for multi-turn validation loops in orchestration code."}
        ],
        "published": True
    },
    {
        "id": "b-03",
        "slug": "marathi-voice-agent-playbook",
        "title": "Building a Marathi Voice Agent: Playbook",
        "tag": "Voice AI",
        "date": "Jan 6, 2026",
        "readTime": "8 min read",
        "author": "Sarthak, Voice Engineering",
        "keywords": "Marathi voice agent, voice AI, Indic dialect, ASR, TTS, Studio Form voice",
        "body": [
            "Creating conversational voice bots that sound natural to local regional speakers requires more than translating English text to Marathi. The system must account for regional dialects, code-mixed phrases, and custom background telephony noise."
        ],
        "sections": [
            {"title": "1. Dialect & Code-Mix Adaptation", "content": "Drivers use colloquial expressions and mix in English terms. Our custom ASR uses code-mix token mapping to interpret sentences accurately."},
            {"title": "2. Reducing Latency below 800ms", "content": "Streaming media payloads from Twilio directly to our Indic parser routes responses straight into our fast TTS node."}
        ],
        "published": True
    },
    {
        "id": "b-04",
        "slug": "rbi-ai-regulation",
        "title": "RBI's Draft AI Regulation: A Pragmatic BFSI Checklist",
        "tag": "India",
        "date": "Jan 12, 2026",
        "readTime": "6 min read",
        "author": "Compliance Operations",
        "keywords": "RBI AI guidelines, BFSI compliance, financial AI guardrails",
        "body": [
            "The Reserve Bank of India (RBI) recently issued draft directives detailing regulatory frameworks for artificial intelligence in banking and financial services."
        ],
        "sections": [
            {"title": "1. On-Premise Data Residence", "content": "All customer transaction files and prompt query logs must remain within local Indian geography."},
            {"title": "2. Explanations & Model Transparency", "content": "Audit logs of weights and search nodes must be preserved."}
        ],
        "published": True
    },
    {
        "id": "b-05",
        "slug": "ai-call-center-solutions",
        "title": "AI Call Center Solutions: How to Compare Platforms Without Buying a Science Project",
        "tag": "Voice AI",
        "date": "Jul 21, 2026",
        "readTime": "10 min read",
        "author": "Studio Form CX Engineering",
        "keywords": "ai call center solutions, ai call center software, contact center ai, voice agent platform, Genesys Cloud AI, Bland AI, Retell AI, Studio Form",
        "callout": "Quick Summary (AI Overview Box): Evaluating AI call center solutions requires balancing latency (<800ms), concurrency, CRM integration, and total cost. US contact center leaders can choose between Enterprise CX Suites (Genesys), Self-Serve Voice Platforms (Bland, Retell), and Implementation-Led Production Stacks (Studio Form). Studio Form offers a managed production path on existing SIP trunks with sub-800ms latency, 99.97% SLA, and predictable monthly packaging.",
        "body": [
            "US contact-center and CX leaders are not hunting for another chatbot demo. They are evaluating AI call center solutions that can answer, qualify, verify, and escalate phone traffic with measurable handle-time and seat-cost impact—without a multi-quarter platform rewrite.",
            "Paid demand around AI call center software stays elevated because each minute of automation sits next to expensive agent labor, which is why buyers treat this category as a high-stakes commercial decision rather than a casual software trial.",
            "This guide is a practical AI call center solutions comparison for operators choosing among enterprise CX suites, self-serve voice-agent platforms, and implementation-led stacks. It prioritizes decision criteria over a thin vendor parade, then shows where each approach tends to win—and where Studio Form fits when speed-to-production and predictable cost matter as much as model quality."
        ],
        "sections": [
            {
                "title": "1. What 'AI Call Center Solutions' Actually Means",
                "content": "Legacy contact center solutions optimized queueing, IVR trees, workforce management, and agent desktops. Modern AI call center software adds a conversational layer that can understand intent across multi-turn speech, execute CRM tasks, hand off to a human with context, and log transcripts for QA.",
                "bullets": [
                    "Enterprise CX platforms with embedded AI — Full suite (routing, WEM, analytics, bots) where AI is one module among many.",
                    "Voice-agent platforms — Focused AI phone agents you configure, connect to SIP/CPaaS, and scale for inbound/outbound.",
                    "Implementation-led production stacks — Engineering partners who assemble telephony + STT/LLM/TTS + CRM workflows as a managed system."
                ]
            },
            {
                "title": "2. The Buyer Scorecard US Teams Should Use",
                "content": "Use the same scorecard for every shortlist. Score 1–5 on each row; weight rows by your bottleneck (cost, language, compliance, or time-to-live):",
                "table": {
                    "headers": ["Criterion", "What 'good' looks like", "Why it breaks deals"],
                    "rows": [
                        ["Conversation latency", "Sub-second turn-taking that feels interruptible", "Callers abandon 'robot pause' agents"],
                        ["Concurrency & reliability", "Clear concurrency model + uptime commitment", "Spikes during campaigns or outages cause dropped calls"],
                        ["Implementation effort", "Weeks to first production path, not quarters of RFP theater", "Internal AI engineering bandwidth is scarce"],
                        ["Total cost shape", "Predictable per-resolution or bundled voice billing", "Token + seat + integration surprise bills"],
                        ["CRM & telephony fit", "Native sync + works with current SIP/CPaaS trunks", "Shadow IT and double entry overhead"],
                        ["Escalation control", "Transfer rules, live transcripts, human fallback", "Brand risk on edge cases"],
                        ["Language & accent reality", "Handles actual caller mix, including code-mixing", "'40 languages' that fail mid-sentence switches"],
                        ["Security & residency", "VPC/on-prem options, audit posture matching industry", "Blocked by security review"]
                    ]
                }
            },
            {
                "title": "3. Approach A — Enterprise CX Suites (e.g., Genesys Cloud AI)",
                "content": "Genesys positions Genesys Cloud AI as embedded, out-of-the-box AI across virtual agents, agent copilots, knowledge, predictive routing, and workforce tools inside Genesys Cloud CX. The pitch is consolidation: conversational, generative, and predictive AI on one CX platform so teams avoid stitching point solutions.",
                "bullets": [
                    "Where it wins: You already run a full contact-center cloud; need WFM, QA, and routing under one vendor governance model.",
                    "Trade-offs: Scope tracks the suite, not a single voice use case; overkill if you only need high-quality phone automation on existing trunks; multi-quarter implementation programs."
                ]
            },
            {
                "title": "4. Approach B — Self-Serve / Platform Voice Agents (e.g., Bland AI, Retell AI)",
                "content": "Specialist AI call center companies productize the phone agent itself. Bland AI markets enterprise voice agents for high-stakes phone work with ~400ms latency and per-minute bundling. Retell AI positions an LLM-based voice-first platform with drag-and-drop agent building, real-time function calling, and CPaaS connectivity.",
                "bullets": [
                    "Where it wins: Product & ops teams want a dashboard-first builder with strong telephony connectors; fast script iteration.",
                    "Trade-offs: You still own conversation design quality, edge-case coverage, and production ops; global platforms may under-serve regional code-mixing or dialect depth."
                ]
            },
            {
                "title": "5. Approach C — Implementation-Led Production Systems (e.g., Studio Form)",
                "content": "Some buyers do not want another console to master. They want a production voice path on current telephony, with CRM writes and escalation rules that operations will actually trust.",
                "subsections": [
                    {"subTitle": "Low Latency & High Concurrency", "text": "Studio Form provides sub-800ms turn-taking latency, 99.97% uptime SLA, and handles 10,000+ daily calls across Twilio, Vonage, Exotel, or private SIP trunks."},
                    {"subTitle": "Predictable Capacity Bundling", "text": "Engagement spans 2-week POC validation pilots, monthly managed retainers, and packaged capacity tiers (Starter: 1,000 mins; Growth: 5,000 mins; Enterprise: unlimited concurrency)."},
                    {"subTitle": "Multilingual Code-Mixing Support", "text": "Engineered for US and global operations with complex caller mixes, supporting mid-sentence dialect and language switching (English, Hindi, Marathi, Tamil, Telugu, Bengali)."}
                ]
            },
            {
                "title": "6. Side-by-Side Comparison Matrix",
                "content": "A decision map comparing the three primary approaches across key operational dimensions:",
                "table": {
                    "headers": ["Dimension", "Enterprise Suite (e.g. Genesys)", "Voice Platforms (e.g. Bland, Retell)", "Implementation-Led (Studio Form)"],
                    "rows": [
                        ["Primary job", "Run full CX cloud with embedded AI", "Build/run AI phone agents fast", "Deliver production voice journeys on your stack"],
                        ["Time-to-first-value", "Program-paced (months/quarters)", "Weeks with focused use case", "Pilot-oriented (2-week POC start)"],
                        ["Cost shape", "Suite licensing + professional services", "Usage (per-minute bundles)", "Packaged pilots/retainers; capacity tiers"],
                        ["Latency posture", "Platform-dependent", "Sub-second (~400–600ms class)", "Sub-800ms turn-taking guaranteed"],
                        ["Ops model", "Central CX admin", "Product/ops configures agents", "Partner + architect-led production"],
                        ["CRM/telephony", "Deep in-suite; broader estate varies", "Broad CPaaS/CCaaS connectors", "Works atop existing SIP/CPaaS; Salesforce/HubSpot/Zoho"],
                        ["Ideal buyer", "Transforming entire contact center", "Shipping discrete AI call agents", "Need production outcomes without internal AI platform team"]
                    ]
                }
            },
            {
                "title": "7. Practical Use Cases to Pilot First",
                "content": "Start with journeys that have high volume, clear success criteria, and tolerable escalation:",
                "bullets": [
                    "Inbound reception / after-hours coverage — identity, intent, routing, appointment capture.",
                    "Outbound lead qualification — consistent discovery questions, CRM disposition, human warm transfer.",
                    "Transaction verification — order confirmation, delivery reschedule, payment or COD checks with strict handoff rules.",
                    "Ticket/triage deflection into voice — status answers and case creation without burning senior agents."
                ]
            },
            {
                "title": "8. How to Choose & Roll Out Without a Multi-Quarter Freeze",
                "content": "Treat selection as a four-gate process: 1) Constraint Lock (Week 0), 2) Architecture Fit (Weeks 0-1), 3) Paid Pilot on One Journey (Weeks 1-3), 4) Scale Gate (Weeks 3-4). Watch for red flags during demos like missing live interruption handling or screenshot-only CRM updates.",
                "faqs": [
                    {"q": "What is the main difference between voice platforms and implementation-led stacks?", "a": "Voice platforms give you a self-serve console to build agents yourself. Implementation-led stacks like Studio Form engineer, integrate, and manage the end-to-end phone journey on your existing SIP trunks."},
                    {"q": "How fast can an AI call center pilot go live?", "a": "With Studio Form's implementation-led approach, a single high-ROI journey (e.g. inbound reception or lead qualification) is validated in a 2-week POC pilot."},
                    {"q": "Can AI call center solutions handle live transfers to human agents?", "a": "Yes. Production-grade systems execute warm live transfers, handing off the caller with a 5-second context summary and live transcript to the human agent."}
                ]
            }
        ],
        "published": True
    }
]


@api_router.get("/blogs")
async def get_blogs(tag: Optional[str] = None, q: Optional[str] = None):
    db_items = []
    if db is not None:
        try:
            cursor = db.blogs.find({"published": True})
            db_items = await cursor.to_list(length=1000)
            for item in db_items:
                item.pop("_id", None)
        except Exception as e:
            db_items = []

    # Combine DB items and SEED_BLOGS (de-duplicating by slug)
    seen_slugs = {item["slug"] for item in db_items}
    combined = list(db_items)
    for seed in SEED_BLOGS:
        if seed["slug"] not in seen_slugs:
            combined.append(seed)

    if tag and tag.lower() != "all":
        combined = [b for b in combined if b.get("tag", "").lower() == tag.lower()]
    if q:
        ql = q.lower()
        combined = [b for b in combined if ql in b.get("title", "").lower() or ql in b.get("keywords", "").lower()]

    return {"count": len(combined), "items": combined}


@api_router.get("/blogs/{slug}")
async def get_blog_by_slug(slug: str):
    if db is not None:
        try:
            item = await db.blogs.find_one({"slug": slug})
            if item:
                item.pop("_id", None)
                return item
        except Exception:
            pass

    # Check SEED_BLOGS
    for seed in SEED_BLOGS:
        if seed["slug"] == slug:
            return seed

    raise HTTPException(status_code=404, detail="Article not found")


@api_router.post("/blogs")
async def create_or_update_blog(payload: BlogPostCreate):
    auth_pass = os.getenv("ADMIN_PASSWORD", "admin@1234")
    if payload.password != auth_pass:
        raise HTTPException(status_code=401, detail="Invalid admin password")

    date_str = payload.date or datetime.now(timezone.utc).strftime("%b %d, %Y")
    
    doc = {
        "id": str(uuid.uuid4()),
        "slug": payload.slug,
        "title": payload.title,
        "tag": payload.tag,
        "date": date_str,
        "readTime": payload.readTime,
        "author": payload.author,
        "keywords": payload.keywords or "",
        "callout": payload.callout,
        "body": payload.body,
        "sections": payload.sections,
        "published": payload.published,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

    if db is not None:
        await db.blogs.update_one(
            {"slug": payload.slug},
            {"$set": doc},
            upsert=True
        )
    return {"ok": True, "slug": payload.slug, "message": "Blog post published successfully!"}


@api_router.delete("/blogs/{slug}")
async def delete_blog(slug: str, password: str = "admin@1234"):
    auth_pass = os.getenv("ADMIN_PASSWORD", "admin@1234")
    if password != auth_pass:
        raise HTTPException(status_code=401, detail="Invalid admin password")

    deleted_count = 0
    if db is not None:
        res = await db.blogs.delete_one({"slug": slug})
        deleted_count = res.deleted_count
    return {"ok": True, "deleted_count": deleted_count}

class MarketingEmailSend(BaseModel):
    password: str
    recipient_email: EmailStr
    recipient_name: Optional[str] = "there"
    recipient_company: Optional[str] = "Your Business"
    template_id: Optional[str] = "general"
    persona: Optional[str] = ""
    platform: Optional[str] = ""
    language: Optional[str] = ""
    custom_subject: Optional[str] = None
    custom_body: Optional[str] = None


@api_router.post("/send-marketing-email")
async def send_marketing_email(payload: MarketingEmailSend):
    if payload.password != "email@1234":
        raise HTTPException(status_code=401, detail="Invalid authorization password")
        
    # Map template ID to filename
    t_id = payload.template_id or "general"
    
    if t_id == "custom":
        rendered_html = payload.custom_body or ""
        subject = payload.custom_subject or "Custom Email"
        # If it doesn't contain HTML tags, format newlines and wrap in styled container
        import re
        if not re.search(r"<[a-zA-Z/][^>]*>", rendered_html):
            formatted_body = rendered_html.replace("\n", "<br>")
            rendered_html = f'<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333; background-color: #ffffff; padding: 30px; min-height: 100%;">{formatted_body}</div>'
    else:
        template_filename = "email-template.html"
        if t_id == "voice":
            template_filename = "voice-agents-template.html"
        elif t_id == "chatbot":
            template_filename = "chatbots-template.html"
        elif t_id == "blueprint":
            template_filename = "blueprint-template.html"
            
        # Locate template path (local filesystem first)
        possible_paths = [
            ROOT_DIR / ".." / "frontend" / "public" / template_filename,
            ROOT_DIR / ".." / "marketing" / template_filename,
            ROOT_DIR / template_filename
        ]
        template_html = ""
        for p in possible_paths:
            if p.exists():
                try:
                    with open(p, "r", encoding="utf-8") as f:
                        template_html = f.read()
                        if template_html and "<div id=\"root\">" not in template_html:
                            break
                except Exception as e:
                    print(f"Error reading local template {p}: {str(e)}")

        if not template_html:
            try:
                import requests
                resp = requests.get(f"https://www.studioform.app/{template_filename}", timeout=5)
                if resp.status_code == 200 and "<div id=\"root\">" not in resp.text:
                    template_html = resp.text
            except Exception as e:
                print(f"HTTP template fetch failed: {str(e)}")

        if not template_html:
            raise HTTPException(status_code=500, detail=f"Email template file ({template_filename}) not found on server")
            
        rendered_html = template_html
        
        if t_id == "voice":
            subject = f"Automate Customer Calls with AI Voice Agents | Studio Form"
        elif t_id == "chatbot":
            subject = f"Extract Insights & Automate Support with RAG Chatbots | Studio Form"
        elif t_id == "blueprint":
            subject = f"Your AI Agent System Architecture Blueprint | Studio Form"
        else:
            name = payload.recipient_name or "there"
            company = payload.recipient_company or "Your Business"
            subject = f"AI Can Save {company} 4-6 Hours Every Day | Studio Form"
            
    # Render variables
    name = payload.recipient_name or "there"
    company = payload.recipient_company or "Your Business"
    
    # Replacing variables
    import re
    rendered_html = re.sub(r'\{\{\s*first_name\s*\|\s*default\("[^"]*"\)\s*\}\}', name, rendered_html)
    rendered_html = re.sub(r'\{\{\s*first_name\s*\}\}', name, rendered_html)
    rendered_html = re.sub(r'\{\{\s*company_name\s*\|\s*default\("[^"]*"\)\s*\}\}', company, rendered_html)
    rendered_html = re.sub(r'\{\{\s*company_name\s*\}\}', company, rendered_html)
    rendered_html = re.sub(r'\{\{\s*persona\s*\}\}', payload.persona or "AI Agent", rendered_html)
    rendered_html = re.sub(r'\{\{\s*platform\s*\}\}', payload.platform or "Web Widget", rendered_html)
    rendered_html = re.sub(r'\{\{\s*language\s*\}\}', payload.language or "English", rendered_html)
    rendered_html = re.sub(r'\{\{\s*email\s*\}\}', payload.recipient_email, rendered_html)
    
    # Also replace variables in custom subject
    subject = re.sub(r'\{\{\s*first_name\s*\|\s*default\("[^"]*"\)\s*\}\}', name, subject)
    subject = re.sub(r'\{\{\s*first_name\s*\}\}', name, subject)
    subject = re.sub(r'\{\{\s*company_name\s*\|\s*default\("[^"]*"\)\s*\}\}', company, subject)
    subject = re.sub(r'\{\{\s*company_name\s*\}\}', company, subject)
    
    # Re-use SMTP & Resend configuration from environment
    smtp_host = os.getenv("SMTP_HOST", "")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASSWORD", "")
    
    # Force sender identity as "Studioform <sales@studioform.app>"
    sender_display = "Studioform <sales@studioform.app>"
    sender_raw = "sales@studioform.app"
    
    resend_key = os.getenv("RESEND_API_KEY", "")
    
    email_id = str(uuid.uuid4())
    status = "success"
    err_msg = None
    
    if resend_key:
        import requests
        headers = {
            "Authorization": f"Bearer {resend_key}",
            "Content-Type": "application/json",
        }
        try:
            r = requests.post(
                "https://api.resend.com/emails",
                headers=headers,
                json={
                    "from": sender_display,
                    "to": payload.recipient_email,
                    "subject": subject,
                    "html": rendered_html,
                },
                timeout=15
            )
            if r.status_code not in [200, 201]:
                status = "failed"
                err_msg = f"Resend service error: {r.status_code} - {r.text}"
        except Exception as e:
            status = "failed"
            err_msg = f"Failed to send via Resend: {str(e)}"
            
    elif smtp_host:
        import smtplib
        from email.mime.text import MIMEText
        from email.header import Header
        try:
            msg = MIMEText(rendered_html, "html", "utf-8")
            msg["Subject"] = Header(subject, "utf-8")
            msg["From"] = sender_display
            msg["To"] = payload.recipient_email
            
            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=15)
                server.ehlo()
                if smtp_port == 587:
                    server.starttls()
                    server.ehlo()
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.sendmail(sender_raw, [payload.recipient_email], msg.as_string())
            server.close()
        except Exception as e:
            status = "failed"
            err_msg = f"Failed to send via SMTP: {str(e)}"
            
    else:
        # Dry-run mode for development
        print(f"[Email Dry Run] From: {sender_display} | To: {payload.recipient_email} | Subject: {subject}")
        err_msg = "Dry run mode (no mailer configured)"
        
    # Save campaign log in MongoDB
    try:
        log_doc = {
            "id": email_id,
            "recipient_email": payload.recipient_email,
            "recipient_name": name,
            "recipient_company": company,
            "status": status,
            "error_message": err_msg if status == "failed" else None,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db["marketing_campaign_logs"].insert_one(log_doc)
    except Exception as dbe:
        print(f"Failed to save marketing log to MongoDB: {str(dbe)}")
        
    if status == "failed":
        raise HTTPException(status_code=500, detail=err_msg)
        
    return {"ok": True, "id": email_id, "detail": err_msg if not resend_key and not smtp_host else None}


@api_router.get("/marketing-campaign-logs")
async def get_marketing_campaign_logs(password: str):
    if password != "email@1234":
        raise HTTPException(status_code=401, detail="Invalid authorization password")
    try:
        cursor = db["marketing_campaign_logs"].find({}).sort("created_at", -1).limit(200)
        logs = []
        async for doc in cursor:
            logs.append({
                "id": doc.get("id"),
                "recipient_email": doc.get("recipient_email"),
                "recipient_name": doc.get("recipient_name"),
                "recipient_company": doc.get("recipient_company"),
                "status": doc.get("status"),
                "error_message": doc.get("error_message"),
                "created_at": doc.get("created_at")
            })
        return logs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


app.include_router(api_router, prefix="/api")
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
    "https://email.studioform.app",
    "https://email.studio-form.app",
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
    if client:
        client.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=5000, reload=True)
