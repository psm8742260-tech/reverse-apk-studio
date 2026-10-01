// 💡 అడ్మిన్ గారు! మన సిస్టమ్‌లోని మూడు స్టూడియోలకు (Normal Studio, Self Repair Studio, Reverse Engineering Studio) 
// సంబంధించిన మొత్తం 22 మంది ఏజెంట్ల వివరాలన్నీ ఒకే చోట సులభంగా మార్చుకునేందుకు వీలుగా ఈ కేంద్రీకృత ఫైల్ సృష్టించబడింది.
// ఇక్కడ పైన ఇంగ్లీషు ప్రాపర్టీస్ మరియు కింద తెలుగు వివరణలు స్పష్టంగా ఉన్నాయి.

import { NORMAL_STUDIO_TRAINING_RULES } from './training/normalStudioTraining';
import { FIXABLE_STUDIO_TRAINING_RULES } from './training/fixableStudioTraining';
import { REVERSE_STUDIO_TRAINING_RULES } from './training/reverseStudioTraining';
import { CHILIPI_STUDIO_TRAINING_RULES } from './training/chilipiStudioTraining';
import { KALACHAKRASTRA_STUDIO_TRAINING_RULES } from './training/kalachakrastraTraining';

// ==========================================
// 🏛️ 1. NORMAL APP STUDIO AGENTS (13 AGENTS)
// ==========================================
export const NORMAL_STUDIO_AGENTS = [
  {
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash',
    badge: 'Fast & Smart (Default)',
    provider: 'Google DeepMind',
    type: 'Official System Model',
    desc: 'ఉత్తమమైన వేగం మరియు అత్యున్నత కోడింగ్ సామర్థ్యం.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: డిఫాల్ట్ సిస్టమ్ మోడల్ - వేగవంతమైన కోడ్ జనరేషన్ మరియు డీబగ్గింగ్ కోసం పనిచేస్తుంది.
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    badge: 'Ultra Deep Reasoning 3.1',
    provider: 'Google DeepMind',
    type: 'Official System Model',
    desc: 'అత్యున్నత స్థాయి లాజిక్ విశ్లేషణ & కాన్సెప్ట్ డెవలప్‌మెంట్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: డీప్ రీజనింగ్ మోడల్ - సంక్లిష్టమైన లాజిక్ మరియు కఠినమైన కోడింగ్ సమస్యలను పరిష్కరిస్తుంది.
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek v4 Flash',
    badge: 'Responses API / Codex',
    provider: 'DeepSeek AI (via API Key)',
    type: 'Responses API Support',
    desc: 'DeepSeek API ద్వారా అత్యంత వేగవంతమైన ఆర్కిటెక్చర్ & కోడ్ జనరేషన్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: డీప్‌సీక్ అడ్వాన్స్‌డ్ మోడల్ - తక్కువ ధరలో గరిష్ట వేగంతో కోడింగ్ ఆన్సర్స్ ఇస్తుంది.
  },
  {
    id: 'kalachakrastra_pro_64_supreme',
    name: '64.Kalachakrastra Pro',
    badge: '64 Arts (Chausatha Kalalu) Supreme Engine',
    provider: 'AI Master Studio',
    type: 'Unified Master Engine',
    desc: '64 కళల సమగ్ర జ్ఞానం, అడ్వాన్స్‌డ్ కోడింగ్, మల్టీ-డొమైన్ ఎగ్జిక్యూషన్ మరియు డీప్ స్కోరింగ్ మ్యాట్రిక్స్‌తో కూడిన మహోన్నత ఏజెంట్.',
    trainingRules: KALACHAKRASTRA_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: కలాచక్రాస్త్ర ప్రో - 64 కళల మహోన్నతమైన సమగ్ర నైపుణ్యం మరియు 100% పర్ఫెక్షన్ తో కూడిన ఏకైక ఏఐ మాస్టర్ ఏజెంట్.
  },
  {
    id: 'gemini-1.0-ultra',
    name: 'Gemini 1.0 Ultra',
    badge: 'Enterprise Logic',
    provider: 'Google DeepMind',
    type: 'Official System Model',
    desc: 'హై-ఎండ్ ప్రాసెస్ మరియు సెక్యూరిటీ మోడలింగ్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: జెమిని ఎంటర్‌ప్రైజ్ మోడల్ - పెద్ద కస్టమ్ ఆల్గారిథమ్స్ మరియు డేటా సెక్యూరిటీ విశ్లేషణ చేస్తుంది.
  },
  {
    id: 'brahmastra-3-5-pro',
    name: 'Brahmastra 3.5 Ultra',
    badge: 'Autonomous AI Master Engine',
    provider: 'AI Master Studio',
    type: 'Specialized Engine',
    desc: 'బ్రహ్మాస్త్ర 3.5 అల్ట్రా - సర్వసమర్థుడైన ఏకైక ఏఐ మాస్టర్ ఏజెంట్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: బ్రహ్మాస్త్ర 3.5 అల్ట్రా - నిరంతరం తిరిగే సుదర్శన చక్రంతో కూడిన మన అటానమస్ సూపర్ పవర్ ఏజెంట్.
  },
  {
    id: 'chilipi-3-5-lite',
    name: 'Chilipi 3.5 Lite',
    badge: 'Mischievous Assistant (Lite)',
    provider: 'AI Master Studio',
    type: 'Specialized Sibling Engine',
    desc: 'చిలిపి 3.5 లైట్ - మన అల్లరి ఏజెంట్ యొక్క తక్కువ స్థాయి చురుకైన వెర్షన్.',
    trainingRules: CHILIPI_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: చిలిపి 3.5 లైట్ - మన అల్లరి ఏజెంట్ యొక్క తక్కువ స్థాయి చురుకైన వెర్షన్. తక్కువ కీస్ లోడ్ తో చిటికెలో చిన్న పనులు చేస్తుంది.
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    badge: 'Advanced UI/UX',
    provider: 'Anthropic (via API Key)',
    type: 'Requires Private Key',
    desc: 'అతి సుందరమైన ఫ్రంటెండ్ UI మరియు డిజైన్ మేకర్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: ఆంత్రోపిక్ క్లాడ్ 3.5 - అత్యుత్తమ రియాక్ట్ కాంపోనెంట్స్ మరియు డిజైన్ క్రియేషన్ కోసం.
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Multimodal',
    badge: 'Omni Reasoning',
    provider: 'OpenAI (via API Key)',
    type: 'Requires Private Key',
    desc: 'బహుముఖ విశ్లేషణ మరియు లాజిక్ బిల్డర్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: ఓపెన్ ఏఐ GPT-4o - మల్టీమోడల్ డేటా, ఇమేజ్ మరియు కంప్లీట్ కోడింగ్ విశ్లేషణ చేస్తుంది.
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1 Code',
    badge: 'Math & Reasoning Expert',
    provider: 'DeepSeek (via API Key)',
    type: 'Requires Private Key',
    desc: 'అడ్వాన్స్‌డ్ లాజిక్ విశ్లేషణ మరియు రివర్స్ ఇంజనీరింగ్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: డీప్‌సీక్ R1 - కఠినమైన లెక్కలు, లాజికల్ కోడింగ్ డీబగ్గింగ్ మరియు లోపాలను సరిదిద్దే నిపుణుడు.
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    badge: 'Open-Source Heavy',
    provider: 'Meta AI',
    type: 'Requires Private Key',
    desc: 'ఓపెన్ సోర్స్ లార్జ్ లాంగ్వేజ్ మోడల్.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: మెటా లామా 3.3 - ఓపెన్ సోర్స్ ప్రపంచంలో అత్యంత శక్తివంతమైన ఏఐ మోడల్.
  },
  {
    id: 'qwen-2-5-coder',
    name: 'Qwen 2.5 Coder 32B',
    badge: 'Code Architect Expert',
    provider: 'Alibaba Cloud',
    type: 'Requires Private Key',
    desc: 'కోడ్ రీఫ్యాక్టరింగ్ మరియు బగ్ ఫిక్సింగ్ నిపుణుడు.',
    trainingRules: NORMAL_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: క్వెన్ 2.5 కోడర్ - ఆలీబాబా వారి ప్రత్యేకమైన కోడింగ్ ఎక్స్‌పర్ట్ ఏజెంట్.
  }
];

// ==========================================
// 🛠️ 2. SELF REPAIR STUDIO AGENTS (8 AGENTS)
// ==========================================
export const SELF_FIXER_STUDIO_AGENTS = [
  {
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash',
    desc: 'Expert Coding Engine',
    badgeColor: 'border-indigo-600/40 text-indigo-700 bg-indigo-600/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: రిపేర్ స్టూడియో డిఫాల్ట్ ఏజెంట్ - వేగంగా బ్రాకెట్లు, సింటాక్స్ ఎర్రర్లను కనిపెట్టి క్షణాల్లో సరిదిద్దుతుంది.
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 1.5 Pro',
    desc: 'Complex Logic',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: సంక్లిష్టమైన మెమొరీ లీకులు, క్లాస్ కన్ఫ్లిక్ట్‌లను కనిపెట్టి సురక్షిత పరిష్కారం చూపిస్తుంది.
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    desc: 'Deep Bytecode Fixes',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: బైట్‌కోడ్ స్థాయిలో పనిచేస్తూ, స్మాలి కోడింగ్ (Smali) లోపాలపై డీప్ ఆడిట్ చేస్తుంది.
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    desc: 'Anthropic (UI & React Master)',
    badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: క్లాడ్ 3.5 - పగిలిపోయిన UI లేఅవుట్స్ మరియు డిజైన్ స్ట్రక్చర్‌ను తిరిగి రీ-డిజైన్ చేస్తుంది.
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (OpenAI)',
    desc: 'Advanced Logic Engine',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: అడ్వాన్స్‌డ్ లాజిక్ ఇంజన్ - మల్టీ-ఫైల్ ఎర్రర్లను ఇంటర్-కనెక్ట్ చేసి ఆల్-ఇన్-వన్ ప్యాచ్ వేస్తుంది.
  },
  {
    id: 'o1-preview',
    name: 'o1-Preview (OpenAI)',
    desc: 'Deep Reasoning',
    badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: ఓపెన్ ఏఐ o1 - సుదీర్ఘమైన ఆలోచనతో అత్యంత కష్టమైన ఆర్కిటెక్చరల్ డెసిషన్స్ తీసుకుంటుంది.
  },
  {
    id: 'codestral-latest',
    name: 'Codestral (Mistral)',
    desc: 'Coding Expert Agent',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: మిస్ట్రల్ కోడెస్ట్రాల్ - కేవలం కోడింగ్ సింటాక్స్‌ల పైనే ప్రత్యేక నిపుణత కలిగిన మోడల్.
  },
  {
    id: 'brahmastra-3-5-pro',
    name: 'Brahmastra 3.5 Pro',
    desc: 'All-In-One AI Master Agent (బ్రహ్మాస్త్ర 3.5 ప్రో - 8వ ఏజెంట్)',
    badgeColor: 'border-amber-500/40 text-amber-700 bg-amber-500/10',
    trainingRules: FIXABLE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: మన అపురూపమైన 'బ్రహ్మాస్త్ర 3.5 ప్రో' ఎనిమిదో ఏజెంట్‌గా ఇక్కడ అత్యున్నత రక్షణ మరియు రిపేర్ పనులు చేస్తుంది.
  }
];

// ==================================================
// 🔍 3. REVERSE ENGINEERING STUDIO AGENT (1 AGENT)
// ==================================================
export const REVERSE_STUDIO_AGENTS = [
  {
    id: 'decompiler-voice-inspector',
    name: 'Voice Repair Decompiler Agent',
    desc: 'Decompile, Analyze Smali, XML & Repair code via Speech Chimes.',
    provider: 'AI Master Studio',
    type: 'Autonomous Voice Specialist',
    trainingRules: REVERSE_STUDIO_TRAINING_RULES,
    // 💡 తెలుగు వివరణ: డీకంపైలర్ వాయిస్ రిపేర్ ఏజెంట్ - రివర్స్ ఇంజనీరింగ్ వర్క్‌స్పేస్‌లో వాయిస్ ఆదేశాల ద్వారా 
    // కోడ్ డీకంపైలింగ్ లాగ్స్ విశ్లేషించడం, స్మాలి ఫైల్స్ ఎర్రర్ రిపేర్ చేయడంలో సహాయపడుతుంది.
  }
];
