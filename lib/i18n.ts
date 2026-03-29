export type Locale = 'en' | 'fr' | 'es' | 'pt' | 'de'

export const LOCALE_CODES: Record<Locale, string> = {
  en: 'en-US', fr: 'fr-FR', es: 'es-ES', pt: 'pt-BR', de: 'de-DE',
}

const COMMON: Record<string, Record<Locale, string>> = {
  // Navigation / Shell
  backAllTools: { en: '← All tools', fr: '← Tous les outils', es: '← Todas las herramientas', pt: '← Todas as ferramentas', de: '← Alle Tools' },
  moreTools: { en: 'More free tools', fr: 'Plus d\'outils gratuits', es: 'Más herramientas gratis', pt: 'Mais ferramentas grátis', de: 'Mehr kostenlose Tools' },
  allToolsArrow: { en: 'All tools →', fr: 'Tous les outils →', es: 'Todas las herramientas →', pt: 'Todas as ferramentas →', de: 'Alle Tools →' },
  copyright: { en: '© 2026 Tools4Free — Free forever', fr: '© 2026 Tools4Free — Gratuit pour toujours', es: '© 2026 Tools4Free — Gratis para siempre', pt: '© 2026 Tools4Free — Grátis para sempre', de: '© 2026 Tools4Free — Für immer kostenlos' },
  deployedOn: { en: 'Deployed on', fr: 'Hébergé sur', es: 'Desplegado en', pt: 'Hospedado em', de: 'Gehostet auf' },
  domainFrom: { en: 'Domain from', fr: 'Domaine de', es: 'Dominio de', pt: 'Domínio de', de: 'Domain von' },
  privacy: { en: 'Privacy', fr: 'Confidentialité', es: 'Privacidad', pt: 'Privacidade', de: 'Datenschutz' },
  terms: { en: 'Terms', fr: 'Conditions', es: 'Términos', pt: 'Termos', de: 'Nutzungsbedingungen' },

  // Trust badges
  trustLocal:   { en: '100% Local',       fr: '100% Local',             es: '100% Local',         pt: '100% Local',           de: '100% Lokal' },
  trustNoData:  { en: 'No data sent',     fr: 'Aucune donnée envoyée',  es: 'Sin envío de datos', pt: 'Nenhum dado enviado',  de: 'Keine Daten gesendet' },
  trustInstant: { en: 'No signup needed', fr: 'Sans inscription',       es: 'Sin registro',       pt: 'Sem cadastro',         de: 'Ohne Anmeldung' },
  trustPrivate: { en: 'Nothing stored',   fr: 'Rien stocké',            es: 'Nada almacenado',    pt: 'Nada armazenado',      de: 'Nichts gespeichert' },

  // Common form labels
  calculate: { en: 'Calculate', fr: 'Calculer', es: 'Calcular', pt: 'Calcular', de: 'Berechnen' },
  result: { en: 'Result', fr: 'Résultat', es: 'Resultado', pt: 'Resultado', de: 'Ergebnis' },
  reset: { en: 'Reset', fr: 'Réinitialiser', es: 'Reiniciar', pt: 'Reiniciar', de: 'Zurücksetzen' },
  copy: { en: 'Copy', fr: 'Copier', es: 'Copiar', pt: 'Copiar', de: 'Kopieren' },
  copied: { en: 'Copied!', fr: 'Copié !', es: '¡Copiado!', pt: 'Copiado!', de: 'Kopiert!' },
  download: { en: 'Download', fr: 'Télécharger', es: 'Descargar', pt: 'Baixar', de: 'Herunterladen' },

  // Shared measurement labels
  weight: { en: 'Weight', fr: 'Poids', es: 'Peso', pt: 'Peso', de: 'Gewicht' },
  height: { en: 'Height', fr: 'Taille', es: 'Altura', pt: 'Altura', de: 'Größe' },
  age: { en: 'Age', fr: 'Âge', es: 'Edad', pt: 'Idade', de: 'Alter' },
  gender: { en: 'Gender', fr: 'Sexe', es: 'Sexo', pt: 'Sexo', de: 'Geschlecht' },
  male: { en: 'Male', fr: 'Homme', es: 'Hombre', pt: 'Homem', de: 'Männlich' },
  female: { en: 'Female', fr: 'Femme', es: 'Mujer', pt: 'Mulher', de: 'Weiblich' },
  select: { en: '— Select —', fr: '— Choisir —', es: '— Seleccionar —', pt: '— Selecionar —', de: '— Auswählen —' },
  optional: { en: '(optional)', fr: '(optionnel)', es: '(opcional)', pt: '(opcional)', de: '(optional)' },

  // Units
  metric: { en: 'Metric', fr: 'Métrique', es: 'Métrico', pt: 'Métrico', de: 'Metrisch' },
  imperial: { en: 'Imperial', fr: 'Impérial', es: 'Imperial', pt: 'Imperial', de: 'Imperial' },
  unitSystem: { en: 'Unit System', fr: 'Système d\'unités', es: 'Sistema de unidades', pt: 'Sistema de unidades', de: 'Einheitensystem' },
  years: { en: 'years', fr: 'ans', es: 'años', pt: 'anos', de: 'Jahre' },
  months: { en: 'months', fr: 'mois', es: 'meses', pt: 'meses', de: 'Monate' },

  // Finance
  amount: { en: 'Amount', fr: 'Montant', es: 'Cantidad', pt: 'Valor', de: 'Betrag' },
  rate: { en: 'Rate', fr: 'Taux', es: 'Tasa', pt: 'Taxa', de: 'Zinssatz' },
  total: { en: 'Total', fr: 'Total', es: 'Total', pt: 'Total', de: 'Gesamt' },
  monthly: { en: 'Monthly', fr: 'Mensuel', es: 'Mensual', pt: 'Mensal', de: 'Monatlich' },
  annually: { en: 'Annually', fr: 'Annuel', es: 'Anual', pt: 'Anual', de: 'Jährlich' },
  price: { en: 'Price', fr: 'Prix', es: 'Precio', pt: 'Preço', de: 'Preis' },

  // Conversion
  from: { en: 'From', fr: 'De', es: 'De', pt: 'De', de: 'Von' },
  to: { en: 'To', fr: 'Vers', es: 'A', pt: 'Para', de: 'Nach' },
  value: { en: 'Value', fr: 'Valeur', es: 'Valor', pt: 'Valor', de: 'Wert' },
}

export function t(key: string, locale: Locale): string {
  return COMMON[key]?.[locale] ?? COMMON[key]?.en ?? key
}
