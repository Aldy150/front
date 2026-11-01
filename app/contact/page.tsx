
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Header from "@/composants/header";
import ScrollReveal from "@/composants/ScrollReveal";

// Coordonnées de Fluno
const coordonnees = [
  { label: "Email", valeur: "Via le formulaire de contact" },
  { label: "Téléphone", valeur: "+242 05 690 21 78" },
  { label: "Localisation", valeur: "Brazzaville, République du Congo" },
  { label: "Horaires", valeur: "Lun - Ven, 8h - 17h" },
];

const typesProjet = [
  "Site ou application web",
  "Application mobile",
  "Solution sur mesure",
  "Maintenance",
  "Autre",
];

const budgets = [
  "À définir ensemble",
  "Moins de 500 000 FCFA",
  "500 000 - 2 000 000 FCFA",
  "Plus de 2 000 000 FCFA",
];

const delais = [
  "Pas de date précise",
  "Moins d'un mois",
  "1 à 3 mois",
  "Plus de 3 mois",
];

const etapes = [
  {
    titre: "Nous étudions votre demande",
    texte:
      "Notre équipe prend connaissance de votre besoin et identifie les premières pistes de solution.",
  },
  {
    titre: "Nous échangeons",
    texte:
      "Un appel ou une visioconférence nous permet de comprendre vos objectifs et vos contraintes.",
  },
  {
    titre: "Vous recevez une proposition",
    texte:
      "Nous vous présentons une proposition adaptée avec les fonctionnalités, le planning et le budget.",
  },
];

const questions = [
  {
    q: "Que dois-je préciser dans mon message ?",
    r:
      "Expliquez le problème que vous souhaitez résoudre, les personnes qui utiliseront la solution et vos objectifs. Quelques lignes suffisent pour commencer.",
  },
  {
    q: "Dois-je avoir un cahier des charges ?",
    r:
      "Non. Vous pouvez simplement nous présenter votre idée. Nous vous accompagnons dans sa clarification et dans la définition des fonctionnalités.",
  },
  {
    q: "Comment se déroule un projet ?",
    r:
      "Le développement avance par étapes, avec des échanges réguliers pour valider les fonctionnalités et suivre la progression.",
  },
  {
    q: "Pouvez-vous reprendre un projet existant ?",
    r:
      "Oui. Nous pouvons analyser votre solution actuelle et vous proposer des améliorations ou une nouvelle approche.",
  },
  {
    q: "Proposez-vous un accompagnement après la livraison ?",
    r:
      "Oui. Nous pouvons assurer la maintenance, les corrections, les mises à jour et l'évolution de votre solution.",
  },
];

const champ =
  "mt-1.5 w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

type Erreurs = Record<string, string>;

type Etat = "repos" | "envoi" | "ok" | "erreur";

export default function Contact() {
  const [etat, setEtat] = useState<Etat>("repos");
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [message, setMessage] = useState("");
  const [validationActive, setValidationActive] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [emailSent, setEmailSent] = useState<boolean | null>(null);

  // Classes dynamiques des champs
  function classeChamp(nom: string) {
    return `${champ} ${
      erreurs[nom]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-blue-100 focus:border-blue-500 focus:ring-blue-500/15"
    }`;
  }

  // Validation des données du formulaire
  function valider(
    donnees: Record<string, FormDataEntryValue>
  ): Erreurs {
    const nouvellesErreurs: Erreurs = {};

    const nom = String(donnees.nom || "").trim();
    const entreprise = String(donnees.entreprise || "").trim();
    const email = String(donnees.email || "").trim();
    const telephone = String(donnees.telephone || "").trim();
    const projet = String(donnees.projet || "").trim();
    const budget = String(donnees.budget || "").trim();
    const delai = String(donnees.delai || "").trim();
    const texte = String(donnees.message || "").trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexTelephone = /^\+?[0-9\s().-]{8,20}$/;

    if (!nom) {
      nouvellesErreurs.nom = "Veuillez renseigner votre nom.";
    } else if (nom.length < 2) {
      nouvellesErreurs.nom =
        "Le nom doit contenir au moins 2 caractères.";
    } else if (nom.length > 100) {
      nouvellesErreurs.nom =
        "Le nom ne peut pas dépasser 100 caractères.";
    }

    if (entreprise.length > 100) {
      nouvellesErreurs.entreprise =
        "Le nom de l'entreprise est trop long.";
    }

    if (!email) {
      nouvellesErreurs.email =
        "L'adresse email est obligatoire.";
    } else if (!regexEmail.test(email) || email.length > 254) {
      nouvellesErreurs.email =
        "Veuillez saisir une adresse email valide.";
    }

    if (telephone && !regexTelephone.test(telephone)) {
      nouvellesErreurs.telephone =
        "Veuillez saisir un numéro de téléphone valide.";
    }

    if (!typesProjet.includes(projet)) {
      nouvellesErreurs.projet =
        "Veuillez choisir un type de projet.";
    }

    if (!budgets.includes(budget)) {
      nouvellesErreurs.budget =
        "Veuillez sélectionner un budget.";
    }

    if (!delais.includes(delai)) {
      nouvellesErreurs.delai =
        "Veuillez sélectionner un délai.";
    }

    if (!texte) {
      nouvellesErreurs.message =
        "Veuillez décrire votre projet.";
    } else if (texte.length < 20) {
      nouvellesErreurs.message =
        "Votre message doit contenir au moins 20 caractères.";
    } else if (texte.length > 2000) {
      nouvellesErreurs.message =
        "Votre message ne peut pas dépasser 2000 caractères.";
    }

    return nouvellesErreurs;
  }

  // Validation progressive des champs
  function gererChangement(
    nomChamp: string,
    formulaire: HTMLFormElement
  ) {
    if (!validationActive) return;

    const donnees = Object.fromEntries(
      new FormData(formulaire)
    );

    const nouvellesErreurs = valider(donnees);

    setErreurs((precedentes) => ({
      ...precedentes,
      [nomChamp]: nouvellesErreurs[nomChamp] || "",
    }));
  }

  // Envoi du formulaire vers l'API Next.js
  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (etat === "envoi") return;

    const formulaire = e.currentTarget;

    const donnees = Object.fromEntries(
      new FormData(formulaire)
    );

    setValidationActive(true);
    setMessageErreur("");
    setEmailSent(null);

    // Vérifier les champs avant l'envoi
    const erreursValidation = valider(donnees);

    setErreurs(erreursValidation);

    if (Object.keys(erreursValidation).length > 0) {
      const premierChamp = Object.keys(erreursValidation)[0];

      formulaire
        .querySelector<HTMLElement>(
          `[name="${premierChamp}"]`
        )
        ?.focus();

      return;
    }

    setEtat("envoi");

    try {
      // Envoyer les données à l'API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: String(donnees.nom || "").trim(),
          entreprise: String(donnees.entreprise || "").trim(),
          email: String(donnees.email || "").trim(),
          telephone: String(donnees.telephone || "").trim(),
          projet: String(donnees.projet || ""),
          budget: String(donnees.budget || ""),
          delai: String(donnees.delai || ""),
          message: String(donnees.message || "").trim(),
        }),
      });

      // Lire la réponse de l'API
      const resultat = await res.json();

      // Vérifier que la demande a bien été enregistrée
      if (
        !res.ok ||
        resultat.success !== true ||
        resultat.saved !== true
      ) {
        throw new Error(
          resultat.message ||
            "Impossible d'enregistrer votre demande."
        );
      }

      // Enregistrement confirmé dans Neon
      setEmailSent(resultat.emailSent === true);
      setEtat("ok");

      // Réinitialiser le formulaire après confirmation
      formulaire.reset();

      setErreurs({});
      setMessage("");
      setValidationActive(false);
    } catch (error) {
      console.error("Erreur formulaire :", error);

      setMessageErreur(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );

      setEtat("erreur");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50/60 text-gray-900">
      {/* Halos bleus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute -right-24 top-60 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative">
        <Header />

        <main className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          {/* Informations de contact */}
          <section className="flex flex-col items-start">
            <ScrollReveal direction="left">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Contact
              </p>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Parlons de{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                  votre projet.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-base leading-relaxed text-gray-600">
                Décrivez-nous votre besoin en quelques lignes.
                Plus vous nous donnez de contexte, plus notre
                première réponse sera précise.
              </p>
            </ScrollReveal>

            <dl className="mt-8 w-full max-w-md divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur">
              {coordonnees.map((c, index) => (
                <ScrollReveal
                  key={c.label}
                  delay={index * 0.08}
                >
                  <div className="flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 hover:bg-blue-50">
                    <dt className="text-sm text-gray-500">
                      {c.label}
                    </dt>

                    <dd className="break-words text-right text-sm font-medium text-gray-900">
                      {c.valeur}
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>

            <ScrollReveal delay={0.15}>
              <div className="mt-6 w-full max-w-md rounded-2xl border border-blue-100 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5">
                <h2 className="text-sm font-semibold text-blue-700">
                  Premier échange gratuit
                </h2>

                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  Le premier échange pour cadrer votre besoin
                  est sans engagement. Vous repartez avec une
                  vision claire de votre projet.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* Formulaire de contact */}
          <ScrollReveal direction="right" delay={0.1}>
            <section className="relative self-start">
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

                <form
                  onSubmit={envoyer}
                  noValidate
                  className="rounded-2xl bg-white/80 p-6 sm:p-8"
                >
                  <div className="mb-7">
                    <h2 className="text-xl font-bold text-gray-900">
                      Parlez-nous de votre besoin
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Les champs marqués d'un astérisque sont obligatoires.
                    </p>
                  </div>

                  {/* Nom et entreprise */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-gray-800">
                      Nom <span className="text-red-500">*</span>

                      <input
                        name="nom"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        placeholder="Votre nom"
                        disabled={etat === "envoi"}
                        className={classeChamp("nom")}
                        onChange={(e) =>
                          gererChangement(
                            "nom",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.nom}
                        aria-describedby={
                          erreurs.nom ? "erreur-nom" : undefined
                        }
                      />

                      {erreurs.nom && (
                        <span
                          id="erreur-nom"
                          className="mt-1 block text-xs text-red-600"
                        >
                          {erreurs.nom}
                        </span>
                      )}
                    </label>

                    <label className="text-sm font-medium text-gray-800">
                      Entreprise{" "}
                      <span className="font-normal text-gray-400">
                        (facultatif)
                      </span>

                      <input
                        name="entreprise"
                        type="text"
                        maxLength={100}
                        autoComplete="organization"
                        placeholder="Votre société"
                        disabled={etat === "envoi"}
                        className={classeChamp("entreprise")}
                        onChange={(e) =>
                          gererChangement(
                            "entreprise",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.entreprise}
                      />

                      {erreurs.entreprise && (
                        <span className="mt-1 block text-xs text-red-600">
                          {erreurs.entreprise}
                        </span>
                      )}
                    </label>

                    {/* Email */}
                    <label className="text-sm font-medium text-gray-800">
                      Email <span className="text-red-500">*</span>

                      <input
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder="vous@exemple.com"
                        disabled={etat === "envoi"}
                        className={classeChamp("email")}
                        onChange={(e) =>
                          gererChangement(
                            "email",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.email}
                        aria-describedby={
                          erreurs.email
                            ? "erreur-email"
                            : undefined
                        }
                      />

                      {erreurs.email && (
                        <span
                          id="erreur-email"
                          className="mt-1 block text-xs text-red-600"
                        >
                          {erreurs.email}
                        </span>
                      )}
                    </label>

                    {/* Téléphone */}
                    <label className="text-sm font-medium text-gray-800">
                      Téléphone{" "}
                      <span className="font-normal text-gray-400">
                        (facultatif)
                      </span>

                      <input
                        name="telephone"
                        type="tel"
                        maxLength={20}
                        autoComplete="tel"
                        placeholder="+242 00 000 0000"
                        disabled={etat === "envoi"}
                        className={classeChamp("telephone")}
                        onChange={(e) =>
                          gererChangement(
                            "telephone",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.telephone}
                      />

                      {erreurs.telephone && (
                        <span className="mt-1 block text-xs text-red-600">
                          {erreurs.telephone}
                        </span>
                      )}
                    </label>
                  </div>

                  {/* Type de projet */}
                  <label className="mt-5 block text-sm font-medium text-gray-800">
                    Type de projet{" "}
                    <span className="text-red-500">*</span>

                    <select
                      name="projet"
                      defaultValue={typesProjet[0]}
                      disabled={etat === "envoi"}
                      className={classeChamp("projet")}
                      onChange={(e) =>
                        gererChangement(
                          "projet",
                          e.currentTarget.form!
                        )
                      }
                      aria-invalid={!!erreurs.projet}
                    >
                      {typesProjet.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>

                    {erreurs.projet && (
                      <span className="mt-1 block text-xs text-red-600">
                        {erreurs.projet}
                      </span>
                    )}
                  </label>

                  {/* Budget et délai */}
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-gray-800">
                      Budget envisagé{" "}
                      <span className="text-red-500">*</span>

                      <select
                        name="budget"
                        defaultValue={budgets[0]}
                        disabled={etat === "envoi"}
                        className={classeChamp("budget")}
                        onChange={(e) =>
                          gererChangement(
                            "budget",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.budget}
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>

                      {erreurs.budget && (
                        <span className="mt-1 block text-xs text-red-600">
                          {erreurs.budget}
                        </span>
                      )}
                    </label>

                    <label className="text-sm font-medium text-gray-800">
                      Délai souhaité{" "}
                      <span className="text-red-500">*</span>

                      <select
                        name="delai"
                        defaultValue={delais[0]}
                        disabled={etat === "envoi"}
                        className={classeChamp("delai")}
                        onChange={(e) =>
                          gererChangement(
                            "delai",
                            e.currentTarget.form!
                          )
                        }
                        aria-invalid={!!erreurs.delai}
                      >
                        {delais.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>

                      {erreurs.delai && (
                        <span className="mt-1 block text-xs text-red-600">
                          {erreurs.delai}
                        </span>
                      )}
                    </label>
                  </div>

                  {/* Description du projet */}
                  <label className="mt-5 block text-sm font-medium text-gray-800">
                    Votre projet{" "}
                    <span className="text-red-500">*</span>

                    <textarea
                      name="message"
                      required
                      rows={5}
                      minLength={20}
                      maxLength={2000}
                      value={message}
                      disabled={etat === "envoi"}
                      placeholder="Quel problème voulez-vous résoudre ? Qui utilisera l'outil ? Quels sont vos objectifs ?"
                      className={`${classeChamp("message")} resize-y`}
                      onChange={(e) => {
                        setMessage(e.target.value);

                        gererChangement(
                          "message",
                          e.currentTarget.form!
                        );
                      }}
                      aria-invalid={!!erreurs.message}
                      aria-describedby={
                        erreurs.message
                          ? "erreur-message"
                          : undefined
                      }
                    />

                    <div className="mt-1 flex items-center justify-between">
                      {erreurs.message ? (
                        <span
                          id="erreur-message"
                          className="text-xs text-red-600"
                        >
                          {erreurs.message}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Minimum 20 caractères.
                        </span>
                      )}

                      <span
                        className={`text-xs ${
                          message.length > 2000
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {message.length}/2000
                      </span>
                    </div>
                  </label>

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={etat === "envoi"}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {etat === "envoi" ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                          />
                        </svg>

                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </button>

                  {/* Confirmation et erreurs */}
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4"
                  >
                    {etat === "ok" && (
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                        <p className="font-semibold">
                          Demande enregistrée avec succès !
                        </p>

                        <p className="mt-1">
                          Merci pour votre confiance. Notre équipe
                          reviendra vers vous prochainement.
                        </p>

                        {emailSent ? (
                          <p className="mt-2 text-green-700">
                            Notre équipe a également reçu une
                            notification par email.
                          </p>
                        ) : (
                          <p className="mt-2 text-orange-700">
                            La notification email n'a pas pu être
                            envoyée, mais votre demande est bien
                            enregistrée.
                          </p>
                        )}
                      </div>
                    )}

                    {etat === "erreur" && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-semibold">
                          Une erreur est survenue.
                        </p>

                        <p className="mt-1">
                          {messageErreur ||
                            "Votre demande n'a pas pu être enregistrée. Veuillez réessayer."}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    Vos informations sont utilisées uniquement
                    pour traiter votre demande.
                  </p>
                </form>
              </div>
            </section>
          </ScrollReveal>
        </main>

        {/* Étapes après l'envoi */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">
              Ce qui se passe après votre message
            </h2>
          </ScrollReveal>

          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {etapes.map((e, i) => (
              <ScrollReveal
                key={e.titre}
                delay={i * 0.12}
              >
                <li className="h-full rounded-2xl border border-blue-100 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-900/5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 text-sm font-semibold text-white">
                    {i + 1}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {e.titre}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {e.texte}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold tracking-tight">
              Questions fréquentes
            </h2>
          </ScrollReveal>

          <div className="mt-6 divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur">
            {questions.map((item, index) => (
              <ScrollReveal
                key={item.q}
                delay={index * 0.07}
              >
                <details className="group px-6 py-4 transition-colors duration-300 open:bg-blue-50/70">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                    {item.q}

                    <svg
                      className="h-4 w-4 shrink-0 text-blue-600 transition-transform duration-300 group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.r}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-100">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
            <p className="text-sm text-gray-500">
              © 2026 Fluno
            </p>

            <a
              href="/"
              className="rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Accueil
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
