"use client";

import Header from "@/composants/header";
import ScrollReveal from "@/composants/ScrollReveal";

const valeurs = [
  {
    titre: "Sur mesure",
    texte: "Chaque projet part de votre besoin, pas d'un modèle préfabriqué.",
  },
  {
    titre: "Transparence",
    texte: "Vous savez où en est votre projet, ce qu'il coûte et ce qui reste à faire.",
  },
  {
    titre: "Qualité",
    texte: "Un code propre, testé et documenté, que vous pouvez faire évoluer.",
  },
  {
    titre: "Proximité",
    texte: "Un interlocuteur unique, disponible, du premier échange à la mise en ligne.",
  },
];

const etapes = [
  { titre: "Écoute", texte: "Nous comprenons votre activité, vos utilisateurs et vos objectifs." },
  { titre: "Conception", texte: "Nous définissons ensemble les écrans, les fonctionnalités et le planning." },
  { titre: "Développement", texte: "Nous construisons par étapes, avec des points réguliers pour valider." },
  { titre: "Mise en ligne", texte: "Nous déployons, puis nous restons là pour le suivi et les évolutions." },
];

const expertises = [
  {
    titre: "Développement web",
    texte: "Sites vitrines, boutiques en ligne, plateformes et espaces clients, pensés pour être rapides et bien référencés.",
  },
  {
    titre: "Applications mobiles",
    texte: "Des applications iOS et Android avec une interface claire, fluide et adaptée à un usage quotidien.",
  },
  {
    titre: "Conception et design",
    texte: "Parcours utilisateur, maquettes et interface : nous dessinons l'outil avant de le construire.",
  },
  {
    titre: "Maintenance et évolution",
    texte: "Corrections, mises à jour de sécurité et nouvelles fonctionnalités après la mise en ligne.",
  },
];

// À adapter aux clients réels de Fluno
const clients = [
  { titre: "Entrepreneurs et indépendants", texte: "Pour lancer une activité avec une présence en ligne solide." },
  { titre: "PME et entreprises", texte: "Pour digitaliser un processus ou proposer un nouveau service." },
  { titre: "Associations et institutions", texte: "Pour mieux informer, organiser et toucher leur public." },
  { titre: "Porteurs de projet", texte: "Pour transformer une idée en un premier produit utilisable." },
];

const roles = [
  { titre: "Chef de projet", texte: "Votre interlocuteur unique : il cadre le besoin, suit le planning et vous tient informé." },
  { titre: "Designer", texte: "Il imagine les parcours et dessine les écrans pour que l'outil soit simple à utiliser." },
  { titre: "Développeurs", texte: "Ils construisent, testent et déploient l'application, web comme mobile." },
];

const engagements = [
  "Un devis clair, avec un périmètre et un planning définis avant de commencer.",
  "Des points d'avancement réguliers, pour valider chaque étape avec vous.",
  "Un code que vous pouvez reprendre, documenté et vous appartenant.",
  "Une réponse honnête, y compris quand une idée n'est pas la bonne solution.",
  "Un suivi après la mise en ligne, pour que votre outil continue de fonctionner.",
];

export default function QuiSommesNous() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50/60 text-gray-900">
      {/* Halos bleus discrets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-24 top-60 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative">
        <Header />

        {/* Présentation */}
        <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-2 lg:py-20">
          <ScrollReveal direction="left">
            <section className="flex flex-col items-start">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Qui sommes-nous
              </p>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Une équipe qui construit{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                  des outils qui servent.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-base leading-relaxed text-gray-600">
                Fluno est une entreprise spécialisée dans le développement web et mobile. Nous
                aidons nos clients à transformer une idée ou un besoin en application concrète,
                fiable et agréable à utiliser.
              </p>

              <a
                href="/contact"
                className="mt-7 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Parlons de votre projet
              </a>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <section className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-blue-500/30 to-blue-200/30 blur-2xl"
              />

              <div className="relative rounded-3xl border border-white/70 bg-white/60 p-3 shadow-xl shadow-blue-900/10 backdrop-blur-xl">
                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                </div>

                <div className="rounded-2xl bg-white/80 p-8">
                  <h2 className="text-lg font-semibold text-blue-700">Notre mission</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    Rendre le numérique simple pour ceux qui le commandent comme pour ceux qui
                    l'utilisent. Une application réussie est une application que l'on comprend
                    du premier coup et qui répond vraiment au besoin de départ.
                  </p>

                  <h2 className="mt-6 text-lg font-semibold text-blue-700">Notre conviction</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    La technologie n'a de valeur que si elle sert un objectif clair. Nous préférons
                    une solution simple qui fonctionne à une solution complexe qui impressionne.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </main>

        {/* Valeurs */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">
              Ce qui guide notre travail
            </h2>
          </ScrollReveal>

          <div className="mt-6 grid divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {valeurs.map((v, index) => (
              <ScrollReveal key={v.titre} delay={index * 0.12}>
                <article className="h-full p-6 transition-colors duration-300 hover:bg-blue-50">
                  <h3 className="text-lg font-semibold text-blue-700">{v.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.texte}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Expertises */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">Notre expertise</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
              De la première maquette au suivi après la mise en ligne, nous couvrons l'ensemble
              d'un projet numérique.
            </p>
          </ScrollReveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {expertises.map((x, index) => (
              <ScrollReveal
                key={x.titre}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <article className="h-full rounded-2xl border border-blue-100 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5">
                  <h3 className="text-lg font-semibold text-gray-900">{x.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{x.texte}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Méthode */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">Comment nous travaillons</h2>
          </ScrollReveal>

          <ol className="mt-6 grid gap-4 md:grid-cols-4">
            {etapes.map((e, i) => (
              <ScrollReveal key={e.titre} delay={i * 0.12}>
                <li className="h-full rounded-2xl border border-blue-100 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-900/5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{e.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{e.texte}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </section>

        {/* Pour qui */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">Pour qui nous travaillons</h2>
          </ScrollReveal>

          <div className="mt-6 grid divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {clients.map((c, index) => (
              <ScrollReveal key={c.titre} delay={index * 0.12}>
                <article className="h-full p-6 transition-colors duration-300 hover:bg-blue-50">
                  <h3 className="text-base font-semibold text-blue-700">{c.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.texte}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Rôles + engagements */}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 lg:grid-cols-2">
          <div>
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-bold tracking-tight">
                Qui travaille sur votre projet
              </h2>
            </ScrollReveal>

            <ul className="mt-6 divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur">
              {roles.map((r, index) => (
                <ScrollReveal key={r.titre} delay={index * 0.1}>
                  <li className="p-5 transition-colors duration-300 hover:bg-blue-50">
                    <h3 className="text-base font-semibold text-gray-900">{r.titre}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{r.texte}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          <div>
            <ScrollReveal direction="right">
              <h2 className="text-2xl font-bold tracking-tight">Nos engagements</h2>
            </ScrollReveal>

            <ul className="mt-6 space-y-3 rounded-2xl border border-blue-100 bg-white/70 p-6 backdrop-blur">
              {engagements.map((e, index) => (
                <ScrollReveal key={e} delay={index * 0.08}>
                  <li className="flex gap-3 text-sm leading-relaxed text-gray-700">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{e}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-xl shadow-blue-900/20 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-blue-400/30 blur-2xl"
              />

              <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Travaillons ensemble</h2>
                  <p className="mt-1 text-sm text-blue-100">
                    Racontez-nous votre projet, nous vous disons honnêtement comment le réaliser.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contactez-nous
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-100">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
            <p className="text-sm text-gray-500">
              © 2026 Fluno
            </p>

            <a
              href="/offres"
              className="rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Suivant
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}