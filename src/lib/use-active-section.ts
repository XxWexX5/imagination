import { useEffect, useState } from "react";

const PROBE_RATIO = 0.35;

function findActiveSection(
	ids: readonly string[],
	topOffset: number,
): string | undefined {
	const sections = ids
		.map((id) => document.getElementById(id))
		.filter((section) => section !== null);

	if (sections.length === 0) {
		return undefined;
	}

	const { scrollHeight } = document.documentElement;
	const atPageBottom =
		window.scrollY > 0 &&
		window.innerHeight + window.scrollY >= scrollHeight - 2;

	if (atPageBottom) {
		return sections.at(-1)?.id;
	}

	const probe = topOffset + (window.innerHeight - topOffset) * PROBE_RATIO;
	let current = sections[0];
	for (const section of sections) {
		if (section.getBoundingClientRect().top <= probe) {
			current = section;
		}
	}

	return current?.id;
}

export function useActiveSection(
	ids: readonly string[],
	topOffset = 0,
): string | undefined {
	const [activeId, setActiveId] = useState(ids[0]);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const next = findActiveSection(ids, topOffset);
			if (next) {
				setActiveId(next);
			}
		};

		const schedule = () => {
			if (frame === 0) {
				frame = requestAnimationFrame(update);
			}
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
		};
	}, [ids, topOffset]);

	return activeId;
}
