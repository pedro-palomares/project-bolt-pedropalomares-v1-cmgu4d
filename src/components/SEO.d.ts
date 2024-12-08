import React from 'react';
interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
}
declare const SEO: React.FC<SEOProps>;
export default SEO;
