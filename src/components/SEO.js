import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
const SEO = ({ title, description, image = 'https://www.pedropalomares.com/og-image.jpg', url = 'https://www.pedropalomares.com' }) => {
    return (_jsxs(Helmet, { children: [_jsx("title", { children: title }), _jsx("meta", { name: "description", content: description }), _jsx("meta", { name: "impact-site-verification", value: "cc462e78-6e0f-4177-b23b-e20a11054d98" }), _jsx("meta", { property: "og:type", content: "website" }), _jsx("meta", { property: "og:url", content: url }), _jsx("meta", { property: "og:title", content: title }), _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { property: "og:image", content: image }), _jsx("meta", { name: "twitter:card", content: "summary_large_image" }), _jsx("meta", { name: "twitter:url", content: url }), _jsx("meta", { name: "twitter:title", content: title }), _jsx("meta", { name: "twitter:description", content: description }), _jsx("meta", { name: "twitter:image", content: image })] }));
};
export default SEO;
