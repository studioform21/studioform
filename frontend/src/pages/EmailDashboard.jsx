import React from 'react';

export default function EmailDashboard() {
    return (
        <div className="w-full h-screen bg-[#050505]">
            <iframe 
                src="/b2b-marketing-email.html" 
                className="w-full h-full border-none"
                title="Emailing Dashboard"
                sandbox="allow-same-origin allow-scripts allow-forms"
            />
        </div>
    );
}
