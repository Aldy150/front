
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@/app/lib/neon";

//export const runtime = "nodejs";

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

function reponseErreur(message: string, status: number) {
    return NextResponse.json(
        { success: false, message, emailSent: false },
        { status }
    );
}

export async function POST(request: Request) {
    try {
        // 1. Lire les données envoyées par le formulaire
        const body = await request.json();

        const nom = typeof body.nom === "string" ? body.nom.trim() : "";
        const entreprise =
            typeof body.entreprise === "string" ? body.entreprise.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim() : "";
        const telephone =
            typeof body.telephone === "string" ? body.telephone.trim() : "";
        const projet = typeof body.projet === "string" ? body.projet : "";
        const budget = typeof body.budget === "string" ? body.budget : "";
        const delai = typeof body.delai === "string" ? body.delai : "";
        const message =
            typeof body.message === "string" ? body.message.trim() : "";

        // 2. Vérifier les données
        const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        const telephoneValide =
            !telephone || /^\+?[0-9\s().-]{8,20}$/.test(telephone);

        if (
            nom.length < 2 ||
            nom.length > 100 ||
            entreprise.length > 100 ||
            email.length > 254 ||
            !emailValide ||
            !telephoneValide ||
            !typesProjet.includes(projet) ||
            !budgets.includes(budget) ||
            !delais.includes(delai) ||
            message.length < 20 ||
            message.length > 2000
        ) {
            return reponseErreur(
                "Certaines informations sont incorrectes. Vérifiez le formulaire.",
                400
            );
        }

        // 3. Vérifier la configuration de l'application
        const apiKey = process.env.RESEND_API_KEY;
        const emailTo = process.env.CONTACT_EMAIL_TO;
        const emailFrom = process.env.CONTACT_EMAIL_FROM;

        if (!process.env.DATABASE_URL) {
            console.error("DATABASE_URL est absente.");
            return reponseErreur(
                "La base de données n'est pas configurée.",
                500
            );
        }

        if (!apiKey || !emailTo || !emailFrom) {
            console.error("Configuration Resend incomplète.");
            return reponseErreur(
                "Le service de notification email n'est pas configuré.",
                500
            );
        }

        // 4. Enregistrer la demande dans Neon
        await sql`
      INSERT INTO demandes_contact (
        nom,
        entreprise,
        email,
        telephone,
        projet,
        budget,
        delai,
        message
      )
      VALUES (
        ${nom},
        ${entreprise || null},
        ${email},
        ${telephone || null},
        ${projet},
        ${budget},
        ${delai},
        ${message}
      )
    `;

        // 5. Envoyer la notification avec Resend
        let emailSent = false;

        try {
            const resend = new Resend(apiKey);

            const { data, error } = await resend.emails.send({
                from: emailFrom,
                to: [emailTo],
                replyTo: email,
                subject: `Nouvelle demande Fluno - ${nom}`,
                text: `
Nouvelle demande reçue depuis le site Fluno.

INFORMATIONS DU CLIENT
Nom : ${nom}
Entreprise : ${entreprise || "Non renseignée"}
Email : ${email}
Téléphone : ${telephone || "Non renseigné"}

DÉTAILS DU PROJET
Type : ${projet}
Budget : ${budget}
Délai : ${delai}

MESSAGE
${message}
        `,
            });

            if (error) {
                console.error("Erreur Resend :", error);
            } else {
                emailSent = true;
                console.log("Notification Resend envoyée :", data?.id);
            }
        } catch (error) {
            console.error("Erreur API contact :", error);

            return reponseErreur(
                "Impossible d'enregistrer votre demande. Veuillez réessayer.",
                500
            );
        }

        // 6. Répondre au formulaire
        // La demande est enregistrée même si la notification email échoue.
        return NextResponse.json({
            success: true,
            saved: true,
            emailSent,
            message: emailSent
                ? "Votre demande a été enregistrée et notre équipe a été notifiée."
                : "Votre demande a bien été enregistrée. La notification email n'a pas pu être envoyée.",
        });
    } catch (error) {
        console.error("Erreur API contact :", error);

        return reponseErreur(
            "Impossible d'enregistrer votre demande. Veuillez réessayer.",
            500
        );
    }
}
