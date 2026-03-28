'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

type Unit = { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }
type Category = { id: string; name: string; icon: string; color: string; units: Unit[] }

const linear = (factor: number): Unit['toBase'] => (v) => v * factor
const linearInv = (factor: number): Unit['fromBase'] => (v) => v / factor

const CATEGORIES: Category[] = [
  { id: 'length', name: 'Length', icon: '📏', color: '#3B82F6', units: [
    { id: 'mm', name: 'Millimeters', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'cm', name: 'Centimeters', toBase: linear(0.01), fromBase: linearInv(0.01) },
    { id: 'm', name: 'Meters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'km', name: 'Kilometers', toBase: linear(1000), fromBase: linearInv(1000) },
    { id: 'in', name: 'Inches', toBase: linear(0.0254), fromBase: linearInv(0.0254) },
    { id: 'ft', name: 'Feet', toBase: linear(0.3048), fromBase: linearInv(0.3048) },
    { id: 'yd', name: 'Yards', toBase: linear(0.9144), fromBase: linearInv(0.9144) },
    { id: 'mi', name: 'Miles', toBase: linear(1609.344), fromBase: linearInv(1609.344) },
  ]},
  { id: 'weight', name: 'Weight', icon: '⚖️', color: '#22A065', units: [
    { id: 'mg', name: 'Milligrams', toBase: linear(0.000001), fromBase: linearInv(0.000001) },
    { id: 'g', name: 'Grams', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'kg', name: 'Kilograms', toBase: linear(1), fromBase: linearInv(1) },
    { id: 't', name: 'Metric Tons', toBase: linear(1000), fromBase: linearInv(1000) },
    { id: 'oz', name: 'Ounces', toBase: linear(0.0283495), fromBase: linearInv(0.0283495) },
    { id: 'lb', name: 'Pounds', toBase: linear(0.453592), fromBase: linearInv(0.453592) },
    { id: 'st', name: 'Stones', toBase: linear(6.35029), fromBase: linearInv(6.35029) },
  ]},
  { id: 'temp', name: 'Temperature', icon: '🌡️', color: '#E8457A', units: [
    { id: 'c', name: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
    { id: 'f', name: 'Fahrenheit', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    { id: 'k', name: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ]},
  { id: 'volume', name: 'Volume', icon: '🧪', color: '#8B5CF6', units: [
    { id: 'ml', name: 'Milliliters', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'l', name: 'Liters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'gal_us', name: 'US Gallons', toBase: linear(3.78541), fromBase: linearInv(3.78541) },
    { id: 'gal_uk', name: 'UK Gallons', toBase: linear(4.54609), fromBase: linearInv(4.54609) },
    { id: 'fl_oz', name: 'Fluid Ounces (US)', toBase: linear(0.0295735), fromBase: linearInv(0.0295735) },
    { id: 'cup', name: 'Cups (US)', toBase: linear(0.236588), fromBase: linearInv(0.236588) },
    { id: 'tbsp', name: 'Tablespoons', toBase: linear(0.0147868), fromBase: linearInv(0.0147868) },
    { id: 'tsp', name: 'Teaspoons', toBase: linear(0.00492892), fromBase: linearInv(0.00492892) },
  ]},
  { id: 'area', name: 'Area', icon: '📐', color: '#EF9F27', units: [
    { id: 'sqm', name: 'Square Meters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'sqkm', name: 'Square Kilometers', toBase: linear(1e6), fromBase: linearInv(1e6) },
    { id: 'sqft', name: 'Square Feet', toBase: linear(0.092903), fromBase: linearInv(0.092903) },
    { id: 'sqmi', name: 'Square Miles', toBase: linear(2.59e6), fromBase: linearInv(2.59e6) },
    { id: 'ha', name: 'Hectares', toBase: linear(10000), fromBase: linearInv(10000) },
    { id: 'acre', name: 'Acres', toBase: linear(4046.86), fromBase: linearInv(4046.86) },
  ]},
  { id: 'speed', name: 'Speed', icon: '💨', color: '#D85A30', units: [
    { id: 'mps', name: 'Meters/second', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'kmh', name: 'Km/hour', toBase: linear(0.277778), fromBase: linearInv(0.277778) },
    { id: 'mph', name: 'Miles/hour', toBase: linear(0.44704), fromBase: linearInv(0.44704) },
    { id: 'kn', name: 'Knots', toBase: linear(0.514444), fromBase: linearInv(0.514444) },
  ]},
  { id: 'data', name: 'Data', icon: '💾', color: '#1A6B4E', units: [
    { id: 'b', name: 'Bytes', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'kb', name: 'Kilobytes', toBase: linear(1024), fromBase: linearInv(1024) },
    { id: 'mb', name: 'Megabytes', toBase: linear(1048576), fromBase: linearInv(1048576) },
    { id: 'gb', name: 'Gigabytes', toBase: linear(1073741824), fromBase: linearInv(1073741824) },
    { id: 'tb', name: 'Terabytes', toBase: linear(1099511627776), fromBase: linearInv(1099511627776) },
  ]},
  { id: 'time', name: 'Time', icon: '⏱️', color: '#6B6560', units: [
    { id: 'ms', name: 'Milliseconds', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 's', name: 'Seconds', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'min', name: 'Minutes', toBase: linear(60), fromBase: linearInv(60) },
    { id: 'hr', name: 'Hours', toBase: linear(3600), fromBase: linearInv(3600) },
    { id: 'day', name: 'Days', toBase: linear(86400), fromBase: linearInv(86400) },
    { id: 'wk', name: 'Weeks', toBase: linear(604800), fromBase: linearInv(604800) },
    { id: 'yr', name: 'Years', toBase: linear(31557600), fromBase: linearInv(31557600) },
  ]},
]

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  // Title / subtitle / nav
  titleA: { en: 'Unit', fr: 'Convertisseur', es: 'Conversor', pt: 'Conversor', de: 'Einheiten' },
  titleB: { en: 'converter', fr: 'd\'unités', es: 'de unidades', pt: 'de unidades', de: 'rechner' },
  navTitle: { en: 'UnitFlip', fr: 'UnitFlip', es: 'UnitFlip', pt: 'UnitFlip', de: 'UnitFlip' },
  subtitle: {
    en: 'Convert anything, instantly. 100% local.',
    fr: 'Convertissez tout, instantanément. 100% local.',
    es: 'Convierta cualquier cosa, al instante. 100% local.',
    pt: 'Converta qualquer coisa, instantaneamente. 100% local.',
    de: 'Alles umrechnen, sofort. 100% lokal.',
  },
  enterValue: { en: 'Enter value', fr: 'Entrez une valeur', es: 'Introduzca un valor', pt: 'Insira um valor', de: 'Wert eingeben' },

  // Category names
  cat_length: { en: 'Length', fr: 'Longueur', es: 'Longitud', pt: 'Comprimento', de: 'Länge' },
  cat_weight: { en: 'Weight', fr: 'Poids', es: 'Peso', pt: 'Peso', de: 'Gewicht' },
  cat_temp: { en: 'Temperature', fr: 'Température', es: 'Temperatura', pt: 'Temperatura', de: 'Temperatur' },
  cat_volume: { en: 'Volume', fr: 'Volume', es: 'Volumen', pt: 'Volume', de: 'Volumen' },
  cat_area: { en: 'Area', fr: 'Superficie', es: 'Área', pt: 'Área', de: 'Fläche' },
  cat_speed: { en: 'Speed', fr: 'Vitesse', es: 'Velocidad', pt: 'Velocidade', de: 'Geschwindigkeit' },
  cat_data: { en: 'Data', fr: 'Données', es: 'Datos', pt: 'Dados', de: 'Daten' },
  cat_time: { en: 'Time', fr: 'Temps', es: 'Tiempo', pt: 'Tempo', de: 'Zeit' },

  // Unit names — Length
  unit_mm: { en: 'Millimeters', fr: 'Millimètres', es: 'Milímetros', pt: 'Milímetros', de: 'Millimeter' },
  unit_cm: { en: 'Centimeters', fr: 'Centimètres', es: 'Centímetros', pt: 'Centímetros', de: 'Zentimeter' },
  unit_m: { en: 'Meters', fr: 'Mètres', es: 'Metros', pt: 'Metros', de: 'Meter' },
  unit_km: { en: 'Kilometers', fr: 'Kilomètres', es: 'Kilómetros', pt: 'Quilômetros', de: 'Kilometer' },
  unit_in: { en: 'Inches', fr: 'Pouces', es: 'Pulgadas', pt: 'Polegadas', de: 'Zoll' },
  unit_ft: { en: 'Feet', fr: 'Pieds', es: 'Pies', pt: 'Pés', de: 'Fuß' },
  unit_yd: { en: 'Yards', fr: 'Yards', es: 'Yardas', pt: 'Jardas', de: 'Yards' },
  unit_mi: { en: 'Miles', fr: 'Miles', es: 'Millas', pt: 'Milhas', de: 'Meilen' },

  // Unit names — Weight
  unit_mg: { en: 'Milligrams', fr: 'Milligrammes', es: 'Miligramos', pt: 'Miligramas', de: 'Milligramm' },
  unit_g: { en: 'Grams', fr: 'Grammes', es: 'Gramos', pt: 'Gramas', de: 'Gramm' },
  unit_kg: { en: 'Kilograms', fr: 'Kilogrammes', es: 'Kilogramos', pt: 'Quilogramas', de: 'Kilogramm' },
  unit_t: { en: 'Metric Tons', fr: 'Tonnes métriques', es: 'Toneladas métricas', pt: 'Toneladas métricas', de: 'Metrische Tonnen' },
  unit_oz: { en: 'Ounces', fr: 'Onces', es: 'Onzas', pt: 'Onças', de: 'Unzen' },
  unit_lb: { en: 'Pounds', fr: 'Livres', es: 'Libras', pt: 'Libras', de: 'Pfund' },
  unit_st: { en: 'Stones', fr: 'Stones', es: 'Stones', pt: 'Stones', de: 'Stones' },

  // Unit names — Temperature
  unit_c: { en: 'Celsius', fr: 'Celsius', es: 'Celsius', pt: 'Celsius', de: 'Celsius' },
  unit_f: { en: 'Fahrenheit', fr: 'Fahrenheit', es: 'Fahrenheit', pt: 'Fahrenheit', de: 'Fahrenheit' },
  unit_k: { en: 'Kelvin', fr: 'Kelvin', es: 'Kelvin', pt: 'Kelvin', de: 'Kelvin' },

  // Unit names — Volume
  unit_ml: { en: 'Milliliters', fr: 'Millilitres', es: 'Mililitros', pt: 'Mililitros', de: 'Milliliter' },
  unit_l: { en: 'Liters', fr: 'Litres', es: 'Litros', pt: 'Litros', de: 'Liter' },
  unit_gal_us: { en: 'US Gallons', fr: 'Gallons US', es: 'Galones US', pt: 'Galões US', de: 'US-Gallonen' },
  unit_gal_uk: { en: 'UK Gallons', fr: 'Gallons UK', es: 'Galones UK', pt: 'Galões UK', de: 'UK-Gallonen' },
  unit_fl_oz: { en: 'Fluid Ounces (US)', fr: 'Onces liquides (US)', es: 'Onzas líquidas (US)', pt: 'Onças líquidas (US)', de: 'Flüssigunzen (US)' },
  unit_cup: { en: 'Cups (US)', fr: 'Tasses (US)', es: 'Tazas (US)', pt: 'Xícaras (US)', de: 'Tassen (US)' },
  unit_tbsp: { en: 'Tablespoons', fr: 'Cuillères à soupe', es: 'Cucharadas', pt: 'Colheres de sopa', de: 'Esslöffel' },
  unit_tsp: { en: 'Teaspoons', fr: 'Cuillères à café', es: 'Cucharaditas', pt: 'Colheres de chá', de: 'Teelöffel' },

  // Unit names — Area
  unit_sqm: { en: 'Square Meters', fr: 'Mètres carrés', es: 'Metros cuadrados', pt: 'Metros quadrados', de: 'Quadratmeter' },
  unit_sqkm: { en: 'Square Kilometers', fr: 'Kilomètres carrés', es: 'Kilómetros cuadrados', pt: 'Quilômetros quadrados', de: 'Quadratkilometer' },
  unit_sqft: { en: 'Square Feet', fr: 'Pieds carrés', es: 'Pies cuadrados', pt: 'Pés quadrados', de: 'Quadratfuß' },
  unit_sqmi: { en: 'Square Miles', fr: 'Miles carrés', es: 'Millas cuadradas', pt: 'Milhas quadradas', de: 'Quadratmeilen' },
  unit_ha: { en: 'Hectares', fr: 'Hectares', es: 'Hectáreas', pt: 'Hectares', de: 'Hektar' },
  unit_acre: { en: 'Acres', fr: 'Acres', es: 'Acres', pt: 'Acres', de: 'Acres' },

  // Unit names — Speed
  unit_mps: { en: 'Meters/second', fr: 'Mètres/seconde', es: 'Metros/segundo', pt: 'Metros/segundo', de: 'Meter/Sekunde' },
  unit_kmh: { en: 'Km/hour', fr: 'Km/heure', es: 'Km/hora', pt: 'Km/hora', de: 'Km/Stunde' },
  unit_mph: { en: 'Miles/hour', fr: 'Miles/heure', es: 'Millas/hora', pt: 'Milhas/hora', de: 'Meilen/Stunde' },
  unit_kn: { en: 'Knots', fr: 'Nœuds', es: 'Nudos', pt: 'Nós', de: 'Knoten' },

  // Unit names — Data
  unit_b: { en: 'Bytes', fr: 'Octets', es: 'Bytes', pt: 'Bytes', de: 'Bytes' },
  unit_kb: { en: 'Kilobytes', fr: 'Kilooctets', es: 'Kilobytes', pt: 'Kilobytes', de: 'Kilobytes' },
  unit_mb: { en: 'Megabytes', fr: 'Mégaoctets', es: 'Megabytes', pt: 'Megabytes', de: 'Megabytes' },
  unit_gb: { en: 'Gigabytes', fr: 'Gigaoctets', es: 'Gigabytes', pt: 'Gigabytes', de: 'Gigabytes' },
  unit_tb: { en: 'Terabytes', fr: 'Téraoctets', es: 'Terabytes', pt: 'Terabytes', de: 'Terabytes' },

  // Unit names — Time
  unit_ms: { en: 'Milliseconds', fr: 'Millisecondes', es: 'Milisegundos', pt: 'Milissegundos', de: 'Millisekunden' },
  unit_s: { en: 'Seconds', fr: 'Secondes', es: 'Segundos', pt: 'Segundos', de: 'Sekunden' },
  unit_min: { en: 'Minutes', fr: 'Minutes', es: 'Minutos', pt: 'Minutos', de: 'Minuten' },
  unit_hr: { en: 'Hours', fr: 'Heures', es: 'Horas', pt: 'Horas', de: 'Stunden' },
  unit_day: { en: 'Days', fr: 'Jours', es: 'Días', pt: 'Dias', de: 'Tage' },
  unit_wk: { en: 'Weeks', fr: 'Semaines', es: 'Semanas', pt: 'Semanas', de: 'Wochen' },
  unit_yr: { en: 'Years', fr: 'Années', es: 'Años', pt: 'Anos', de: 'Jahre' },

  // SEO
  seoH2: {
    en: 'Free unit converter',
    fr: 'Convertisseur d\'unités gratuit',
    es: 'Conversor de unidades gratuito',
    pt: 'Conversor de unidades gratuito',
    de: 'Kostenloser Einheitenrechner',
  },
  seoP1: {
    en: 'UnitFlip converts between all common units across eight categories: length, weight, temperature, volume, area, speed, data storage, and time. Results update in real time as you type, giving you instant answers without pressing a button. The tool supports metric, imperial, and US customary systems, making it useful whether you are following a European recipe or reading American building plans. All calculations happen locally in your browser.',
    fr: 'UnitFlip convertit entre toutes les unités courantes dans huit catégories : longueur, poids, température, volume, superficie, vitesse, stockage de données et temps. Les résultats se mettent à jour en temps réel au fur et à mesure que vous tapez, vous donnant des réponses instantanées sans appuyer sur un bouton. L\'outil prend en charge les systèmes métrique, impérial et US, ce qui le rend utile que vous suiviez une recette européenne ou lisiez des plans de construction américains. Tous les calculs sont effectués localement dans votre navigateur.',
    es: 'UnitFlip convierte entre todas las unidades comunes en ocho categorías: longitud, peso, temperatura, volumen, área, velocidad, almacenamiento de datos y tiempo. Los resultados se actualizan en tiempo real mientras escribe, ofreciéndole respuestas instantáneas sin pulsar un botón. La herramienta admite los sistemas métrico, imperial y estadounidense, lo que la hace útil tanto si sigue una receta europea como si lee planos de construcción americanos. Todos los cálculos se realizan localmente en su navegador.',
    pt: 'O UnitFlip converte entre todas as unidades comuns em oito categorias: comprimento, peso, temperatura, volume, área, velocidade, armazenamento de dados e tempo. Os resultados são atualizados em tempo real conforme você digita, fornecendo respostas instantâneas sem precisar clicar em um botão. A ferramenta suporta os sistemas métrico, imperial e americano, sendo útil tanto para seguir uma receita europeia quanto para ler plantas de construção americanas. Todos os cálculos são feitos localmente no seu navegador.',
    de: 'UnitFlip rechnet zwischen allen gängigen Einheiten in acht Kategorien um: Länge, Gewicht, Temperatur, Volumen, Fläche, Geschwindigkeit, Datenspeicher und Zeit. Die Ergebnisse werden in Echtzeit aktualisiert, während Sie tippen, und liefern sofortige Antworten ohne Knopfdruck. Das Tool unterstützt metrische, imperiale und US-amerikanische Maßsysteme und ist damit nützlich, ob Sie ein europäisches Rezept befolgen oder amerikanische Baupläne lesen. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
  },
  seoH3a: {
    en: 'Eight unit categories in one place',
    fr: 'Huit catégories d\'unités en un seul endroit',
    es: 'Ocho categorías de unidades en un solo lugar',
    pt: 'Oito categorias de unidades em um só lugar',
    de: 'Acht Einheitenkategorien an einem Ort',
  },
  seoP2: {
    en: 'Instead of searching for separate converters for every unit type, UnitFlip gives you everything on a single page. Switch between categories with one click — convert kilometers to miles, kilograms to pounds, Celsius to Fahrenheit, liters to gallons, and much more. The data storage category handles bytes through terabytes, which is handy when comparing cloud storage plans or estimating file transfer times. Every conversion uses precise formulas with no rounding shortcuts.',
    fr: 'Au lieu de chercher des convertisseurs séparés pour chaque type d\'unité, UnitFlip vous offre tout sur une seule page. Passez d\'une catégorie à l\'autre en un clic — convertissez des kilomètres en miles, des kilogrammes en livres, des Celsius en Fahrenheit, des litres en gallons, et bien plus encore. La catégorie stockage de données gère les octets jusqu\'aux téraoctets, ce qui est pratique pour comparer des offres de stockage cloud ou estimer les temps de transfert de fichiers. Chaque conversion utilise des formules précises sans raccourcis d\'arrondi.',
    es: 'En lugar de buscar convertidores separados para cada tipo de unidad, UnitFlip le ofrece todo en una sola página. Cambie entre categorías con un clic — convierta kilómetros a millas, kilogramos a libras, Celsius a Fahrenheit, litros a galones y mucho más. La categoría de almacenamiento de datos maneja desde bytes hasta terabytes, lo cual es útil al comparar planes de almacenamiento en la nube o estimar tiempos de transferencia de archivos. Cada conversión utiliza fórmulas precisas sin atajos de redondeo.',
    pt: 'Em vez de procurar conversores separados para cada tipo de unidade, o UnitFlip oferece tudo em uma única página. Alterne entre categorias com um clique — converta quilômetros em milhas, quilogramas em libras, Celsius em Fahrenheit, litros em galões e muito mais. A categoria de armazenamento de dados lida com bytes até terabytes, o que é útil ao comparar planos de armazenamento em nuvem ou estimar tempos de transferência de arquivos. Cada conversão usa fórmulas precisas sem atalhos de arredondamento.',
    de: 'Statt nach separaten Umrechnern für jeden Einheitentyp zu suchen, bietet UnitFlip alles auf einer einzigen Seite. Wechseln Sie mit einem Klick zwischen den Kategorien — rechnen Sie Kilometer in Meilen, Kilogramm in Pfund, Celsius in Fahrenheit, Liter in Gallonen und vieles mehr um. Die Kategorie Datenspeicher verarbeitet Bytes bis Terabytes, was beim Vergleich von Cloud-Speicherplänen oder der Schätzung von Dateiübertragungszeiten praktisch ist. Jede Umrechnung verwendet präzise Formeln ohne Rundungsabkürzungen.',
  },
  seoH3b: {
    en: 'Metric and imperial made simple',
    fr: 'Métrique et impérial simplifiés',
    es: 'Métrico e imperial de forma sencilla',
    pt: 'Métrico e imperial de forma simples',
    de: 'Metrisch und imperial einfach gemacht',
  },
  seoP3: {
    en: 'The metric system is used by most of the world, while the imperial system remains standard in the United States and a few other countries. This can create confusion when reading international recipes, travel guides, or technical specifications. UnitFlip eliminates that friction by showing the converted value instantly. It is especially helpful for students, travelers, engineers, and anyone who works with measurements from different regions on a regular basis.',
    fr: 'Le système métrique est utilisé par la majeure partie du monde, tandis que le système impérial reste la norme aux États-Unis et dans quelques autres pays. Cela peut créer de la confusion lors de la lecture de recettes internationales, de guides de voyage ou de spécifications techniques. UnitFlip élimine cette difficulté en affichant la valeur convertie instantanément. Il est particulièrement utile pour les étudiants, les voyageurs, les ingénieurs et toute personne travaillant régulièrement avec des mesures de différentes régions.',
    es: 'El sistema métrico es utilizado por la mayor parte del mundo, mientras que el sistema imperial sigue siendo el estándar en Estados Unidos y algunos otros países. Esto puede generar confusión al leer recetas internacionales, guías de viaje o especificaciones técnicas. UnitFlip elimina esa fricción mostrando el valor convertido al instante. Es especialmente útil para estudiantes, viajeros, ingenieros y cualquier persona que trabaje regularmente con medidas de diferentes regiones.',
    pt: 'O sistema métrico é usado pela maior parte do mundo, enquanto o sistema imperial continua sendo o padrão nos Estados Unidos e em alguns outros países. Isso pode gerar confusão ao ler receitas internacionais, guias de viagem ou especificações técnicas. O UnitFlip elimina essa dificuldade mostrando o valor convertido instantaneamente. É especialmente útil para estudantes, viajantes, engenheiros e qualquer pessoa que trabalhe regularmente com medidas de diferentes regiões.',
    de: 'Das metrische System wird in den meisten Ländern der Welt verwendet, während das imperiale System in den USA und einigen anderen Ländern Standard bleibt. Das kann zu Verwirrung führen, wenn man internationale Rezepte, Reiseführer oder technische Spezifikationen liest. UnitFlip beseitigt diese Reibung, indem es den umgerechneten Wert sofort anzeigt. Es ist besonders hilfreich für Studenten, Reisende, Ingenieure und alle, die regelmäßig mit Maßeinheiten aus verschiedenen Regionen arbeiten.',
  },
  seoCross: {
    en: 'Need to convert currencies instead of units? Use the <a href="/currency-converter" style="color:#FF6B35;text-decoration:underline">Currency Converter</a> for live exchange rates. For quick math on discounts and tax rates, check out the <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Percentage Calculator</a>.',
    fr: 'Besoin de convertir des devises plutôt que des unités ? Utilisez le <a href="/currency-converter" style="color:#FF6B35;text-decoration:underline">Convertisseur de devises</a> pour les taux de change. Pour des calculs rapides sur les remises et les taux de taxe, découvrez le <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Calculateur de pourcentage</a>.',
    es: '¿Necesita convertir divisas en lugar de unidades? Use el <a href="/currency-converter" style="color:#FF6B35;text-decoration:underline">Conversor de divisas</a> para tipos de cambio. Para cálculos rápidos de descuentos e impuestos, consulte la <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Calculadora de porcentajes</a>.',
    pt: 'Precisa converter moedas em vez de unidades? Use o <a href="/currency-converter" style="color:#FF6B35;text-decoration:underline">Conversor de moedas</a> para taxas de câmbio. Para cálculos rápidos de descontos e impostos, confira a <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Calculadora de porcentagem</a>.',
    de: 'Müssen Sie Währungen statt Einheiten umrechnen? Nutzen Sie den <a href="/currency-converter" style="color:#FF6B35;text-decoration:underline">Währungsrechner</a> für Wechselkurse. Für schnelle Berechnungen von Rabatten und Steuersätzen nutzen Sie den <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Prozentrechner</a>.',
  },
}

export default function UnitConverterClient({
  defaultCategory,
  defaultFrom,
  defaultTo,
  defaultValue,
  locale = 'en' as Locale,
}: {
  defaultCategory?: string
  defaultFrom?: string
  defaultTo?: string
  defaultValue?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key
  const unitName = (unitId: string) => lt('unit_' + unitId)
  const catName = (catId: string) => lt('cat_' + catId)

  const [catId, setCatId] = useState(defaultCategory || 'length')
  const [fromId, setFromId] = useState(defaultFrom || 'cm')
  const [toId, setToId] = useState(defaultTo || 'in')
  const [value, setValue] = useState(defaultValue || '100')

  const cat = CATEGORIES.find(c => c.id === catId)!
  const fromUnit = cat.units.find(u => u.id === fromId) || cat.units[0]
  const toUnit = cat.units.find(u => u.id === toId) || cat.units[1]

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return ''
    const base = fromUnit.toBase(v)
    const out = toUnit.fromBase(base)
    return Number.isInteger(out) ? out.toString() : out.toPrecision(8).replace(/\.?0+$/, '')
  }, [value, fromUnit, toUnit])

  const swap = () => { setFromId(toId); setToId(fromId) }

  const changeCat = (id: string) => {
    setCatId(id)
    const c = CATEGORIES.find(c => c.id === id)!
    setFromId(c.units[0].id)
    setToId(c.units[1]?.id || c.units[0].id)
    setValue('1')
  }

  const selectStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10,
    padding: '12px 14px', fontSize: 15, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', cursor: 'pointer',
    appearance: 'none' as const, WebkitAppearance: 'none' as const,
  }

  return (
    <ToolShell name={lt('navTitle')} icon="⇄" currentPath="/unit-converter" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⇄</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: cat.color }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Category tabs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24, justifyContent: 'center' }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => changeCat(c.id)} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
                border: catId === c.id ? `1.5px solid ${c.color}` : '1.5px solid #E8E4DB',
                background: catId === c.id ? c.color + '10' : '#fff',
                color: catId === c.id ? c.color : '#6B6560',
                display: 'flex', alignItems: 'center', gap: 4,
              }}><span style={{ fontSize: 13 }}>{c.icon}</span> {catName(c.id)}</button>
            ))}
          </div>
        </section>

        {/* Converter */}
        <section style={{ maxWidth: 500, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* From */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>{t('from', locale)}</label>
              <select value={fromId} onChange={e => setFromId(e.target.value)} style={selectStyle}>
                {cat.units.map(u => <option key={u.id} value={u.id}>{unitName(u.id)}</option>)}
              </select>
            </div>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder={lt('enterValue')}
              style={{
                width: '100%', border: '2px solid #E8E4DB', borderRadius: 12, padding: '16px 18px',
                fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#1C1B18',
                background: '#FAFAF8', outline: 'none', textAlign: 'center',
                marginBottom: 16,
              }} />

            {/* Swap */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <button onClick={swap} style={{
                width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E8E4DB',
                background: '#fff', cursor: 'pointer', fontSize: 18, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
                color: '#6B6560',
              }}>⇅</button>
            </div>

            {/* To */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>{t('to', locale)}</label>
              <select value={toId} onChange={e => setToId(e.target.value)} style={selectStyle}>
                {cat.units.map(u => <option key={u.id} value={u.id}>{unitName(u.id)}</option>)}
              </select>
            </div>

            {/* Result */}
            <div style={{
              background: cat.color + '08', border: `1.5px solid ${cat.color}20`,
              borderRadius: 14, padding: '20px', textAlign: 'center', marginTop: 8,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{t('result', locale)}</div>
              <div style={{ fontSize: 32, fontFamily: fm, fontWeight: 700, color: cat.color, wordBreak: 'break-all' }}>
                {result || '—'}
              </div>
              <div style={{ fontSize: 13, color: '#9A958A', marginTop: 4 }}>{unitName(toUnit.id)}</div>
            </div>

            {/* Formula */}
            {value && result && (
              <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, fontFamily: fm, color: '#9A958A' }}>
                {value} {unitName(fromUnit.id)} = {result} {unitName(toUnit.id)}
              </div>
            )}
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: lt('seoCross') }} />
        </section>
      </div>
    </ToolShell>
  )
}
