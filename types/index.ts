/** --- COMPONENTS --- **/

export interface PageTemplateProps {
	title: string;
	description?: string;
	content?: string;
	favicon?: string;
	children: React.ReactNode;
}