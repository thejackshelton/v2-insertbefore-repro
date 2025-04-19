import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { Otp } from "~/components/otp";

export default component$(() => {
	const slots = Array.from({ length: 4 });

	return (
		<Otp.Root class="flex flex-col items-center justify-center">
			<Otp.HiddenInput />

			<div class="otp-container flex flex-row justify-center gap-2">
				{slots.map((slot) => (
					<Otp.Item
						key={`otp-item-${slot}`}
						class={
							"h-9 w-10 border-2 text-center rounded data-[highlighted]:ring-qwik-blue-800 data-[highlighted]:ring-[3px] caret-blue-600"
						}
					>
						<Otp.Caret class="text-blue-500 text-xl animate-blink-caret">
							|
						</Otp.Caret>
					</Otp.Item>
				))}
			</div>
		</Otp.Root>
	);
});

export const head: DocumentHead = {
	title: "Welcome to Qwik",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
