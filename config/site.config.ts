// Self Config your site for here

import { GrGithub, GrValidate, GrNodes, GrMail, GrCompass } from 'react-icons/gr';

interface siteConfig {
    title: string;
    description: string;
}

export const siteConfig: siteConfig = {
    title: 'GChat',
    description: 'Unlock next-level conversations with AI',
};

export const sidebarMoreMenu = [
    {
        title: 'Uri D',
        value: 'uri-d',
        url: '#',
        icon: GrCompass,
    },
];
