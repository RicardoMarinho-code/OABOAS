import type { NextPage } from "next";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";

const ShopPage: NextPage = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<TopBar />
			<LeftBar selectedTab={null} />
			<main className="mx-auto flex max-w-6xl justify-center gap-6 px-4 pt-20 pb-32 sm:px-6 md:ml-24 md:gap-10 md:pt-24 lg:ml-64">
				<div className="flex w-full max-w-3xl flex-col gap-6">
					<header className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-sm backdrop-blur">
						<h1 className="text-3xl font-bold text-gray-900">Loja</h1>
						<p className="mt-2 text-sm text-gray-500">
							Em breve você poderá trocar seus lingots por benefícios.
						</p>
					</header>
					<section className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/60 p-6 text-blue-900">
						<h3 className="text-lg font-bold">Em construção</h3>
						<p className="mt-1 text-sm">Funcionalidade visual para demonstração.</p>
					</section>
				</div>
				<RightBar />
			</main>
			<BottomBar selectedTab={null} />
		</div>
	);
};

export default ShopPage;
