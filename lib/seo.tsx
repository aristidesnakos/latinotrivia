    // Start of Selection
    import type { Metadata } from "next";
    import config from "@/configs/configuration";
    
    type LocationInfo = {
      cityName: string;
      regionName: string;
      countryCode: string;
      state?: string;
    };
    
    export const getSEOTags = ({
      title,
      description,
      keywords,
      openGraph,
      canonicalUrlRelative,
      extraTags,
      location,
    }: Metadata & {
      canonicalUrlRelative?: string;
      extraTags?: Record<string, any>;
      location?: LocationInfo;
    } = {}): Metadata => {
    
      return {
        title: title || config.appName,
        description: description || config.appDescription,
        keywords: keywords || config.keywords,
        applicationName: config.appName,
        metadataBase: new URL(
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/"
            : `https://${config.domainName}/`
        ),
    
        openGraph: {
          title: openGraph?.title || title || config.appName,
          description: openGraph?.description || description || config.appDescription,
          url: openGraph?.url || `https://${config.domainName}${canonicalUrlRelative || ''}`,
          siteName: config.appName,
          images: openGraph?.images,
          locale: openGraph?.locale || 'en_US',
        },
    
        twitter: {
          title: openGraph?.title || title || config.appName,
          description: openGraph?.description || description || config.appDescription,
          card: "summary_large_image",
          creator: "@just_aristides",
        },
    
        alternates: {
          canonical: `https://${config.domainName}${canonicalUrlRelative || ''}`,
        },
    
        ...extraTags,
      };
    };
    
    // Export renderSchemaTags if needed
    export const renderSchemaTags = (/* parameters */) => {
      // Existing function logic...
    };