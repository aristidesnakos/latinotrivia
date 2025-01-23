// Base interface with index signature
export interface EmailTemplateVariables {
    email_title: string;
    email_heading: string;
    greeting: string;
    email_body: string;
    logo_url: string;
    closing_message: string;
    email_signature: string;
    current_year: string;
    company_name: string;
}

// If you need a specific welcome email type, you can keep this
export type WelcomeEmailVariables = EmailTemplateVariables;