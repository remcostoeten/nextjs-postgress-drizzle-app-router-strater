export type LocaleRouteParams = { params: { locale: string } };

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    links: {
        gitlab?: string;
        github?: string;
        linkedin?: string;
        whatsapp?: string;
        email?: string;
        baseurl?: string;
    };
}

export type LayoutProps = {
    children: React.ReactNode
}
