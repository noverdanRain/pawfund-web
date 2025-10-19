"use client";

import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

const campaignMarkdown = `
# Provide Comfort for Cats/Animals on the Road

Every day, countless stray cats and animals wander the streets searching for food, shelter, and care. Many of them suffer from hunger, injuries, or untreated illnesses — silently struggling to survive.

## Our Mission

This campaign aims to **provide comfort and care for stray animals** by offering:

- **Nutritious meals** for hungry cats and dogs  
- **Medical treatment** for the sick and injured  
- **Shelter and warmth** for those without a home  
- **Spaying and neutering programs** to prevent overpopulation  

Through your support, we can make their days safer, their nights warmer, and their lives filled with hope.

## How You Can Help

- 🐾 **Donate:** Every small contribution helps provide food and medical aid.  
- ❤️ **Share:** Spread this campaign to raise awareness and compassion.  
- 🏡 **Volunteer:** Join us in feeding and rescuing street animals.

Together, we can bring kindness to those who need it the most — one meal, one rescue, and one warm heart at a time.

> “The greatness of a nation and its moral progress can be judged by the way its animals are treated.”  
> — *Mahatma Gandhi*
`;

export default function CampaignStory() {
	return (
		<>
			<p className="mt-4 mb-4 text-lg font-bold">Campaign Story</p>
			<div
				className={cn(
					"prose max-w-none",
					"prose-headings:my-1 prose-headings:text-base prose-headings:font-semibold",
					"prose-p:my-1",
					"prose-ul:my-1 prose-ol:my-1",
					"prose-blockquote:my-2",
					"prose-hr:my-3.5",
					"prose-img:my-2 prose-img:rounded-xl",
					"prose-strong:font-semibold",
				)}
			>
				<Markdown>{campaignMarkdown}</Markdown>
			</div>
		</>
	);
}
