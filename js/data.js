/* ==========================================================================
   Site content. Edit this file to add papers, news, press, and awards —
   every page (and the Research Space) renders from it.
   ========================================================================== */

const SCHOLAR = "https://scholar.google.com/citations?user=oxgNwDsAAAAJ&hl=en";
const scholarSearch = (t) => "https://scholar.google.com/scholar?q=" + encodeURIComponent(t);

/* Research domains — the hubs of the Research Space. `cv` names the palette variable in
   css/style.css, so the colors follow the light/dark theme. */
const DOMAINS = {
  T: {
    name: "Trust & Safety",
    short: "Trust & Safety",
    cv: "--magenta",
    blurb:
      "The through-line of everything: auditing language technologies for sociodemographic bias, cultural harm, ableism, and hallucination, and asking what it takes for an AI system to deserve trust.",
  },
  D: {
    name: "Deep Research & Autoresearch",
    short: "Deep Research",
    cv: "--cyan",
    blurb:
      "AI that does research for us: auditing what deep research agents and answer engines cite, building enterprise research pipelines that know when they have enough evidence, and training models that propose diverse, grounded scientific ideas.",
  },
  A: {
    name: "Agent Pipelines & Evaluation",
    short: "Agent Pipelines",
    cv: "--indigo",
    blurb:
      "How agentic systems are designed, deployed, and judged: moving past the chatbot interface, carrying research into production, and testing whether LLM and MLLM judges can be trusted to grade agents.",
  },
  C: {
    name: "Agent-to-Agent Communication",
    short: "Agent-to-Agent",
    cv: "--teal",
    blurb:
      "What happens when agents talk to other agents: how persuasion and beliefs cascade through LLM agent networks, and how images make vision-language agents easier to sway.",
  },
  P: {
    name: "AI Simulation & Persona Alignment",
    short: "AI Simulation",
    cv: "--orchid",
    blurb:
      "Simulated users and personas that stand in for real people: auditing who synthetic personas represent, grounding them in interviews and social science, and measuring how they drift over long conversations.",
  },
  H: {
    name: "Human-Centered AI",
    short: "Human-Centered AI",
    cv: "--lime",
    blurb:
      "Keeping people at the center: privacy at web scale, broadcast police communications, content moderation, peer review, crowdsourced critique of LLMs, and how AI should be governed.",
  },
};

for (const d of Object.values(DOMAINS)) d.color = `var(${d.cv})`;

/* Publications. d = domains (first is primary), first = Pranav is first / co-first author,
   award = optional award label. Citation counts come from js/scholar.js (auto-generated). */
const PUBLICATIONS = [
  // 2026
  { y: 2026, t: "Training Reasoning Models to Generate Diverse Scientific Ideas", a: "Wadhwa, M., Venkit, P., Hayashi, H., Li, Y., Chakrabarty, T., Wu, C.S.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2610.22324", d: ["D", "A"] },
  { y: 2026, t: "Belief Cascades Drive Persuasion in LLM Agent Networks", a: "Qiu, H.*, Liu, G.*, Venkit, P., Huang, K.H., Gabriel, S., Wu, C.S., Peng, N.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2608.25152", d: ["C", "T"] },
  { y: 2026, t: "Redesigning and Auditing Deep Research Writing for Faithful Reports", a: "Hayashi, H.*, Venkit, P.*, Choubey, P.K.*, Wu, C.S.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2608.28643", d: ["D", "T"], first: true },
  { y: 2026, t: "Best Friends, Not Forever: Evaluating Long-Horizon Persona Collapse and Behavioral Drift in AI Companions", a: "Venkit, P., Prabhakar, A., Li, Y., Lee, D., Wu, C.S.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2607.28818", d: ["P", "T"], first: true },
  { y: 2026, t: "Agents in the Wild: Where Research Meets Deployment", a: "Yang, G.H., Venkit, P., Sedghamiz, H., Santus, E., Dibia, V., Baldini, I.", v: "Tutorial at the 32nd ACM SIGKDD Conference (KDD 2026)", vs: "KDD '26 Tutorial", u: "https://dl.acm.org/doi/abs/10.1145/3770855.3816449", d: ["A"] },
  { y: 2026, t: "Jury Duty: Calibration and Orientation Failures in MLLM-as-a-Judge Under Cultural Ambiguity", a: "Lee, D., Sharma, H., Park, E., Venkit, P., Kim, J., Chia, K.M., Vlachos, A., Joty, S.", v: "Conference on Empirical Methods in NLP (EMNLP) 2026 — to appear", vs: "EMNLP '26", u: "https://arxiv.org/abs/2606.20676", d: ["A", "T"] },
  { y: 2026, t: "What if AI systems weren't chatbots?", a: "Ghosh, S., Venkit, P., Gautam, S., Ghosh, A.", v: "ACM Conference on Fairness, Accountability, and Transparency (FAccT) 2026", vs: "FAccT '26", u: "https://dl.acm.org/doi/abs/10.1145/3805689.3812232", d: ["A", "H"] },
  { y: 2026, t: "Don't Stop Early: Scalable Enterprise Deep Research with Controlled Information Flow and Evidence-Aware Termination", a: "Choubey, P.K.*, Huang, K.H.*, Venkit, P.*, Zhang, J.*, Vats, V., Li, Y., Peng, X., Wu, C.S.", v: "64th Annual Meeting of the Association for Computational Linguistics (ACL) 2026", vs: "ACL '26", u: "https://aclanthology.org/2026.acl-industry.116/", d: ["D", "A"], first: true },
  { y: 2026, t: "Beyond Detection: Governing GenAI in Academic Peer Review as a Sociotechnical Challenge", a: "Chakravorti, T., Venkit, P., Ghosh, S., Rajtmajer, S.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2026", vs: "AIES '26", u: "https://arxiv.org/abs/2603.20214", d: ["H", "T"] },
  { y: 2026, t: "InterviewSim: A Scalable Framework for Interview-Grounded Personality Simulation", a: "Li, Y., Venkit, P., Pruksachatkun, Y., Wu, C.S.", v: "Conference on Language Modeling (COLM) 2026", vs: "COLM '26", u: "https://arxiv.org/abs/2602.20294", d: ["P", "A"] },
  { y: 2026, t: "The Need for a Socially-Grounded Persona Framework for User Simulation", a: "Venkit, P., Li, Y., Pruksachatkun, Y., Wu, C.S.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2601.07110", d: ["P", "H"], first: true },
  { y: 2026, t: "A Tale of Two Identities: An Ethical Audit of AI-Crafted Synthetic Personas", a: "Venkit, P., Li, J., Zhou, Y., Rajtmajer, S., Wilson, S.", v: "AAAI Conference on Artificial Intelligence (AAAI) 2026", vs: "AAAI '26", u: "https://ojs.aaai.org/index.php/AAAI/article/view/41112", d: ["P", "T"], first: true },
  { y: 2026, t: "DeepTRACE: Auditing Deep Research AI Systems for Tracking Reliability Across Citations and Evidence", a: "Venkit, P., Laban, P., Zhou, Y., Mao, Y., Wu, C.S.", v: "International Conference on Learning Representations (ICLR) 2026", vs: "ICLR '26", u: "https://arxiv.org/abs/2509.04499", d: ["D", "T"], first: true },
  { y: 2026, t: "MMPersuade: A Dataset and Evaluation Framework for Multimodal Persuasion", a: "Qiu, H., Zhou, Y., Venkit, P., Huang, K.H., Zhang, J., Peng, N., Wu, C.S.", v: "Conference on Empirical Methods in NLP (EMNLP) 2026 — to appear", vs: "EMNLP '26", u: "https://openreview.net/forum?id=RWPxyyjFyr", d: ["C"] },
  { y: 2026, t: "Seeing is Believing? Evaluating Vision-Language Model Susceptibility in Agent-to-Agent Multimodal Persuasion", a: "Qiu, H., Zhou, Y., Venkit, P., Huang, K.H., Zhang, J., Peng, N., Wu, C.S.", v: "Conference on Empirical Methods in NLP (EMNLP) 2026 — to appear", vs: "EMNLP '26", u: "https://arxiv.org/abs/2510.22768", d: ["C", "T"] },
  // 2025
  { y: 2025, t: "Search Engines in the AI Era: A Qualitative Understanding to the False Promise of Factual and Verifiable Source-Cited Responses in LLM-based Search", a: "Venkit, P., Laban, P., Zhou, Y., Mao, Y., Wu, C.S.", v: "ACM Conference on Fairness, Accountability, and Transparency (FAccT) 2025", vs: "FAccT '25", u: "https://dl.acm.org/doi/abs/10.1145/3715275.3732089", d: ["D", "H"], first: true },
  { y: 2025, t: "The Unappreciated Role of Intent in Algorithmic Moderation of Social Media Content", a: "Wang, X., Koneru, S., Venkit, P., Frischmann, B., Rajtmajer, S.", v: "Harvard Kennedy School (HKS) Misinformation Review", vs: "HKS Misinfo Review", u: "https://misinforeview.hks.harvard.edu/article/the-unappreciated-role-of-intent-in-algorithmic-moderation-of-abusive-content-on-social-media/", d: ["H", "T"] },
  { y: 2025, t: "Documenting Patterns of Exoticism of Marginalized Populations within Text-to-Image Generators", a: "Ghosh, S., Gautam, S., Venkit, P., Ghosh, A.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2025", vs: "AIES '25", u: "https://ojs.aaai.org/index.php/AIES/article/view/36614", d: ["T", "H"] },
  { y: 2025, t: "Exposing AI Bias by Crowdsourcing: Democratizing Critique of Large Language Models", a: "Guo, H., Venkit, P., Jang, E., Srinath, M., Zhang, W., Mingole, B., Gupta, V., Varshney, K., Sundar, S., Yadav, A.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2025", vs: "AIES '25", u: "https://ojs.aaai.org/index.php/AIES/article/view/36620", d: ["H", "T"] },
  { y: 2025, t: "Social Scientists on the Role of AI in Research", a: "Chakravorti, T., Wang, X., Venkit, P., Koneru, S., Munger, K., Rajtmajer, S.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2025", vs: "AIES '25", u: "https://ojs.aaai.org/index.php/AIES/article/view/36568", d: ["H", "D"] },
  { y: 2025, t: "Can Third-parties Read Our Emotions?", a: "Li, J., Zhou, Y., Venkit, P., Binte Islam, H., Arya, S., Wilson, S., Rajtmajer, S.", v: "63rd Annual Meeting of the Association for Computational Linguistics (ACL) 2025", vs: "ACL '25", u: "https://aclanthology.org/2025.acl-long.1042/", d: ["H"] },
  { y: 2025, t: "Society and Bias: Uncovering Automated Prejudices in Sociotechnical Natural Language Processing Systems", a: "Venkit, P.", v: "Ph.D. Dissertation, Pennsylvania State University", vs: "PhD Thesis", u: "https://etda.libraries.psu.edu/catalog/20178pnv5011", d: ["T", "H"], first: true, award: "Best AI Dissertation — Honorable Mention" },
  // 2024
  { y: 2024, t: "Hey GPT, Can You be More Racist? Analysis from Crowdsourced Attempts to Elicit Biased Content from Generative AI", a: "Guo, H., Venkit, P., Jang, E., Srinath, M., Zhang, W., Mingole, B., Gupta, V., Varshney, K., Sundar, S., Yadav, A.", v: "arXiv Preprint", vs: "Preprint", u: scholarSearch("Hey GPT, Can You be More Racist? Analysis from Crowdsourced Attempts to Elicit Biased Content from Generative AI"), d: ["T", "H"] },
  { y: 2024, t: "LLMs assist NLP Researchers: Critique Paper (Meta-) Reviewing", a: "Du, J., Wang, Y., Zhao, W., Deng, Z., Liu, S., Lou, R., Zou, H.P., Venkit, P., et al.", v: "Conference on Empirical Methods in NLP (EMNLP) 2024", vs: "EMNLP '24", u: "https://aclanthology.org/2024.emnlp-main.292/", d: ["D", "A"] },
  { y: 2024, t: "An Audit on the Perspectives and Challenges of Hallucinations in NLP", a: "Venkit, P., Chakravorti, T., Gupta, V., Biggs, H., Srinath, M., Goswami, K., Rajtmajer, S., Wilson, S.", v: "Conference on Empirical Methods in NLP (EMNLP) 2024", vs: "EMNLP '24", u: "https://aclanthology.org/2024.emnlp-main.375.pdf", d: ["T", "A"], first: true },
  { y: 2024, t: "Do Generative AI Models Output Harm while Representing Non-Western Cultures: Evidence from A Community-Centered Approach", a: "Ghosh, S.*, Venkit, P.*, Gautam, S.*, Wilson, S., Caliskan, A.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2024", vs: "AIES '24", u: "https://ojs.aaai.org/index.php/AIES/article/view/31651", d: ["T", "H"], first: true },
  { y: 2024, t: "Race and Privacy in Broadcast Police Communications", a: "Venkit, P., Graziul, C., Goodman, M., Kenny, S., Wilson, S.", v: "ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW) 2024", vs: "CSCW '24", u: "https://dl.acm.org/doi/abs/10.1145/3686921", d: ["H", "T"], first: true, award: "DEI Recognition Award" },
  { y: 2024, t: "CALM: A Multi-task Benchmark for Comprehensive Assessment of Language Model Bias", a: "Gupta, V., Venkit, P., Laurençon, H., Wilson, S., Passonneau, R.", v: "Conference on Language Modeling (COLM) 2024", vs: "COLM '24", u: "https://openreview.net/pdf?id=BdeBSdwfvh", d: ["T", "A"] },
  { y: 2024, t: "Sociodemographic Bias in Language Models: A Survey and Forward Path", a: "Gupta, V., Venkit, P., Wilson, S., Passonneau, R.", v: "Gender Bias in NLP Workshop (GeBNLP) at ACL 2024", vs: "GeBNLP @ ACL '24", u: scholarSearch("Sociodemographic Bias in Language Models: A Survey and Forward Path"), d: ["T"] },
  { y: 2024, t: "From Melting Pots to Misrepresentations: Exploring Harms in Generative AI", a: "Gautam, S.*, Venkit, P.*, Ghosh, S.*", v: "GenAICHI Workshop at CHI 2024", vs: "GenAICHI @ CHI '24", u: "https://generativeaiandhci.github.io/papers/2024/genaichi2024_34.pdf", d: ["T", "H"], first: true },
  { y: 2024, t: "Automated Detection and Analysis of Data Practices Using A Real-World Corpus", a: "Srinath, M., Venkit, P., Badillo, M., Schaub, F., Giles, L., Wilson, S.", v: "Findings of the Association for Computational Linguistics (ACL) 2024", vs: "ACL Findings '24", u: "https://aclanthology.org/2024.findings-acl.271/", d: ["H"] },
  { y: 2024, t: "The Need For Inclusive NLP: Addressing Sociodemographic Bias and Enhancing Sociotechnical Systems through Interdisciplinary Frameworks", a: "Venkit, P.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2024 — Doctoral Consortium", vs: "AIES '24 DC", u: "https://ojs.aaai.org/index.php/AIES/article/view/31905", d: ["T", "H"], first: true },
  // 2023
  { y: 2023, t: "The Sentiment Problem: A Critical Survey towards Deconstructing Sentiment Analysis", a: "Venkit, P., Srinath, M., Gautam, S., Venkatraman, S., Gupta, V., Passonneau, R., Wilson, S.", v: "Conference on Empirical Methods in NLP (EMNLP) 2023", vs: "EMNLP '23", u: "https://aclanthology.org/2023.emnlp-main.848/", d: ["T", "H"], first: true, award: "Outstanding Paper Award" },
  { y: 2023, t: "Unmasking Nationality Bias: A Study of Human Perception of Nationalities in AI-Generated Articles", a: "Venkit, P., Gautam, S., Panchanadikar, R., Huang, T.H., Wilson, S.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2023", vs: "AIES '23", u: "https://dl.acm.org/doi/10.1145/3600211.3604667", d: ["T", "H"], first: true },
  { y: 2023, t: "Automated Ableism: An Exploration of Explicit Disability Biases in Sentiment and Toxicity Analysis Models", a: "Venkit, P., Srinath, M., Wilson, S.", v: "TrustNLP Workshop at ACL 2023", vs: "TrustNLP @ ACL '23", u: "https://aclanthology.org/2023.trustnlp-1.3/", d: ["T"], first: true, award: "Best Short Paper Award" },
  { y: 2023, t: "Privacy Lost and Found: An Investigation at Scale of Web Privacy Policy Availability", a: "Srinath, M., Sundareswara, S., Venkit, P., Giles, C.L., Wilson, S.", v: "ACM Symposium on Document Engineering (DocEng) 2023", vs: "DocEng '23", u: "https://dl.acm.org/doi/abs/10.1145/3573128.3604902", d: ["H"], award: "Best Student Paper Award" },
  { y: 2023, t: "Privacy Now or Never: Large-Scale Extraction and Analysis of Dates in Privacy Policy Text", a: "Srinath, M., Matheson, L., Venkit, P., Zanfir-Fortuna, G., Schaub, F., Giles, C.L., Wilson, S.", v: "ACM Symposium on Document Engineering (DocEng) 2023", vs: "DocEng '23", u: "https://dl.acm.org/doi/abs/10.1145/3573128.3609342", d: ["H"] },
  { y: 2023, t: "Towards a Holistic Approach: Understanding Sociodemographic Biases in NLP Models using an Interdisciplinary Lens", a: "Venkit, P.", v: "AAAI/ACM Conference on AI, Ethics, and Society (AIES) 2023", vs: "AIES '23", u: "https://dl.acm.org/doi/10.1145/3600211.3604754", d: ["T", "H"], first: true },
  { y: 2023, t: "Nationality Bias in Text Generation", a: "Venkit, P., Gautam, S., Panchanadikar, R., Huang, T.H., Wilson, S.", v: "Conference of the European Chapter of the ACL (EACL) 2023", vs: "EACL '23", u: "https://aclanthology.org/2023.eacl-main.9/", d: ["T"], first: true },
  // 2022
  { y: 2022, t: "A Study of Implicit Bias in Pretrained Language Models against People with Disabilities", a: "Venkit, P., Srinath, M., Wilson, S.", v: "International Conference on Computational Linguistics (COLING) 2022", vs: "COLING '22", u: "https://aclanthology.org/2022.coling-1.113.pdf", d: ["T"], first: true },
  // 2021
  { y: 2021, t: "Identification of Bias Against People with Disabilities in Sentiment Analysis and Toxicity Detection Models", a: "Venkit, P., Wilson, S.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2111.13259", d: ["T"], first: true },
  { y: 2021, t: "A Jupyter Book Approach to Latent Dirichlet Allocation and Bias Understanding", a: "Venkit, P., Dudas, P.", v: "Workshop on Visualization for AI Explainability (VISxAI) 2021", vs: "VISxAI '21", u: "https://dudaspm.github.io/LDA_Bias_Data/", d: ["H"], first: true },
  { y: 2021, t: "A Sourceful Twist: Emoji Prediction Based on Sentiment, Hashtags and Application Source", a: "Venkit, P., Karishma, Z., Hsu, C., Katiki, R., Huang, K., Wilson, S., Dudas, P.", v: "arXiv Preprint", vs: "Preprint", u: "https://arxiv.org/abs/2103.07833", d: ["H"], first: true },
];

/* News. k = kind: paper | award | media | role | update */
const NEWS = [
  { d: "Oct 2026", k: "paper", h: 'New autoresearch preprint: <a href="https://arxiv.org/abs/2610.22324">“Training Reasoning Models to Generate Diverse Scientific Ideas”</a>. Set-level RL teaches an 8B model to propose grounded ideas that are both strong and distinct from one another.' },
  { d: "Aug 2026", k: "talk", h: 'Co-presented the tutorial <a href="https://esantus.github.io/agents-in-the-wild-kdd2026/">“Agents in the Wild: Where Research Meets Deployment”</a> at <b>KDD 2026</b> in Jeju, Korea.' },
  { d: "Jul 2026", k: "talk", h: 'Presented our poster on <a href="https://aclanthology.org/2026.acl-industry.116/">“Don\'t Stop Early”</a> (scalable enterprise deep research) at <b>ACL 2026</b> in San Diego.' },
  { d: "Jun 2026", k: "talk", h: 'Invited speaker at the <a href="https://cfe.columbia.edu/content/mlss2"><b>Machine Learning Summer School (MLSS) 2026</b></a> at Columbia University. I taught “Evaluating AI Agents in the Era of Benchmarks” to ~200 PhD students: how to rigorously measure, benchmark, and stress-test agentic systems on complex, real-world tasks. Thanks to Ioana Baldini and Enrico Santus for planning the AI agent sessions with me.' },
  { d: "2026", k: "paper", h: 'Three papers at <b>EMNLP 2026</b>: <a href="https://arxiv.org/abs/2606.20676">Jury Duty</a>, <a href="https://openreview.net/forum?id=RWPxyyjFyr">MMPersuade</a>, and <a href="https://arxiv.org/abs/2510.22768">Seeing is Believing?</a>, plus <a href="https://arxiv.org/abs/2602.20294">InterviewSim</a> at <b>COLM 2026</b>.' },
  { d: "Apr 2026", k: "update", h: '<a href="https://arxiv.org/abs/2509.04499">DeepTRACE</a> at <b>ICLR 2026</b> in Rio de Janeiro, featured in <a href="https://www.salesforce.com/blog/salesforce-iclr-2026/">Salesforce AI Research at ICLR 2026</a>.' },
  { d: "Apr 2026", k: "paper", h: 'Co-authored <a href="https://aclanthology.org/2026.acl-industry.116/">“Don\'t Stop Early: Scalable Enterprise Deep Research with Controlled Information Flow and Evidence-Aware Termination”</a> accepted at <b>ACL 2026</b> in San Diego.' },
  { d: "Apr 2026", k: "paper", h: 'Our work <a href="https://dl.acm.org/doi/abs/10.1145/3805689.3812232">“What if AI systems weren\'t chatbots?”</a> accepted at <b>FAccT 2026</b> in Montréal.' },
  { d: "Feb 2026", k: "update", h: 'Co-authored <a href="https://arxiv.org/abs/2602.20294">InterviewSim</a>, a scalable framework for interview-grounded personality simulation.' },
  { d: "Feb 2026", k: "update", h: 'Released <a href="https://arxiv.org/abs/2601.07110">“The Need for a Socially-Grounded Persona Framework for User Simulation”</a>.' },
  { d: "Feb 2026", k: "media", h: 'Our AAAI 2026 audit of AI-crafted synthetic personas was covered by <a href="https://techxplore.com/news/2026-02-chatbots-overemphasize-sociodemographic-stereotypes.html">Tech Xplore</a>.' },
  { d: "Jan 2026", k: "paper", h: '<a href="https://arxiv.org/abs/2509.04499">“DeepTRACE: Auditing Deep Research AI Systems”</a> accepted at <b>ICLR 2026</b> in Rio de Janeiro.' },
  { d: "Nov 2025", k: "paper", h: '<a href="https://ojs.aaai.org/index.php/AAAI/article/view/41112">“A Tale of Two Identities: An Ethical Audit of Human and AI-Crafted Personas”</a> accepted at <b>AAAI 2026</b> in Singapore.' },
  { d: "Oct 2025", k: "update", h: 'Co-wrote <a href="https://www.salesforce.com/blog/trusted-deepresearch/">“Towards Trustworthy Enterprise Deep Research”</a> on the Salesforce blog.' },
  { d: "Sep 2025", k: "media", h: 'Our audit of deep research models was covered in <a href="https://www.newscientist.com/article/2496133-around-one-third-of-ai-search-tool-answers-make-unsupported-claims/">New Scientist</a> and <a href="https://techxplore.com/news/2025-09-ai-tools-unreliable-overconfident-sided.html">Tech Xplore</a>.' },
  { d: "Jun 2025", k: "media", h: "Research spotlighted in the <b>Penn State Research 2024</b> magazine and the College of IST’s <b>iConnect 2025</b>." },
  { d: "May 2025", k: "media", h: 'My dissertation was featured in <a href="https://ai.psu.edu/doctoral-students-honored-for-ai-dissertations/">Penn State News</a>.' },
  { d: "May 2025", k: "award", h: '<b>Honorable Mention, Best AI Dissertation</b> at Penn State for my thesis <a href="https://etda.libraries.psu.edu/catalog/20178pnv5011">“Society and Bias”</a>.' },
  { d: "May 2025", k: "update", h: 'Officially graduated with my <b>Ph.D. in Informatics</b> from Penn State.' },
  { d: "May 2025", k: "role", h: "Joined <b>Salesforce AI Research</b> as a Research Scientist on the Interactive AI team, led by Jason Wu." },
  { d: "Apr 2025", k: "media", h: 'My work on disability bias in AI was discussed on <a href="https://www.wpxi.com/news/businesses-are-increasingly-turning-ai-ensure-accessibility-people-with-disabilities-is-it-working/XYS66B3BNFOUBKPK3IA2KTTYKY/">WPXI-TV</a>.' },
  { d: "Apr 2025", k: "role", h: "Program Committee for <b>AIES 2025</b>." },
  { d: "Apr 2025", k: "role", h: "Area Chair for <b>ACL 2025</b> (ARR May cycle)." },
  { d: "Apr 2025", k: "paper", h: '<a href="https://dl.acm.org/doi/abs/10.1145/3715275.3732089">“Search Engines in the AI Era”</a> published at <b>FAccT 2025</b> in Athens.' },
  { d: "Mar 2025", k: "award", h: "Received the <b>IST Travel Award</b> for presenting at EMNLP 2024 in Miami." },
  { d: "Feb 2025", k: "role", h: "Area Chair for <b>ACL 2025</b> (ARR February cycle)." },
  { d: "Feb 2025", k: "update", h: 'Successfully defended my Ph.D. thesis, <a href="https://etda.libraries.psu.edu/catalog/20178pnv5011">“Society and Bias”</a> — officially <b>Dr. Venkit</b>! 🎓' },
  { d: "Jan 2025", k: "role", h: "Program Committee for <b>FAccT 2025</b>." },
  { d: "Nov 2024", k: "award", h: "Recognized as an <b>Outstanding Reviewer</b> for EMNLP 2024." },
  { d: "Nov 2024", k: "paper", h: '<a href="https://aclanthology.org/2024.emnlp-main.375.pdf">“An Audit on the Perspectives and Challenges of Hallucinations in NLP”</a> published at <b>EMNLP 2024</b> in Miami.' },
  { d: "Nov 2024", k: "media", h: 'My work on broadcast police communications was featured in <a href="https://www.psu.edu/news/research/story/broadcast-police-communications-may-pose-privacy-risks-especially-black-men">Penn State News</a>.' },
  { d: "Nov 2024", k: "award", h: "<b>DEI Recognition Award at CSCW 2024</b> for our analysis of broadcast police communications — work that centers populations otherwise excluded." },
  { d: "Nov 2024", k: "paper", h: '<a href="https://dl.acm.org/doi/abs/10.1145/3686921">“Race and Privacy in Broadcast Police Communications”</a> published at <b>CSCW 2024</b> in San José, Costa Rica.' },
  { d: "Oct 2024", k: "paper", h: '<a href="https://ojs.aaai.org/index.php/AIES/article/view/31651">“Do Generative AI Models Output Harm while Representing Non-Western Cultures”</a> presented at <b>AIES 2024</b> in San Jose.' },
  { d: "Oct 2024", k: "paper", h: '<a href="https://openreview.net/pdf?id=BdeBSdwfvh">“CALM: A Multi-task Benchmark for Comprehensive Assessment of Language Model Bias”</a> accepted at the first-ever <b>COLM</b> in Philadelphia.' },
  { d: "Sep 2024", k: "update", h: "Wrapped up my internship at Salesforce AI Research with Jason Wu, Philippe Laban, Yixin Mao, and Yilun Zhou, building evaluation benchmarks for answer engines like Perplexity and Bing Copilot." },
  { d: "May 2024", k: "role", h: "Started a summer internship as a Research AI Intern on the <b>Interactive AI team at Salesforce AI Research</b>." },
  { d: "Dec 2023", k: "award", h: '<b>Outstanding Paper Award at EMNLP 2023</b> in Singapore for <a href="https://aclanthology.org/2023.emnlp-main.848/">“The Sentiment Problem”</a>.' },
  { d: "Aug 2023", k: "award", h: '<b>Best Student Paper Award at DocEng 2023</b> for <a href="https://dl.acm.org/doi/abs/10.1145/3573128.3604902">“Privacy Lost and Found”</a>.' },
  { d: "Jul 2023", k: "award", h: '<b>Best Short Paper Award at TrustNLP @ ACL 2023</b> for <a href="https://aclanthology.org/2023.trustnlp-1.3/">“Automated Ableism”</a>.' },
  { d: "Feb 2023", k: "paper", h: '<a href="https://aclanthology.org/2023.eacl-main.9/">“Nationality Bias in Text Generation”</a> accepted at <b>EACL 2023</b>.' },
];

const NEWS_KINDS = {
  paper: { label: "Paper", color: "var(--cyan)" },
  award: { label: "Award", color: "var(--orchid)" },
  media: { label: "Press", color: "var(--magenta)" },
  talk: { label: "Talk", color: "var(--teal)" },
  role: { label: "Service", color: "var(--lime)" },
  update: { label: "Update", color: "var(--indigo)" },
};

const PRESS = [
  { d: "Feb 2026", o: "Tech Xplore", t: "Chatbots overemphasize sociodemographic stereotypes, researchers report", u: "https://techxplore.com/news/2026-02-chatbots-overemphasize-sociodemographic-stereotypes.html" },
  { d: "Sep 2025", o: "New Scientist", t: "Around one-third of AI search tool answers make unsupported claims", u: "https://www.newscientist.com/article/2496133-around-one-third-of-ai-search-tool-answers-make-unsupported-claims/" },
  { d: "Sep 2025", o: "Tech Xplore", t: "A new study finds AI tools are often unreliable, overconfident and one-sided", u: "https://techxplore.com/news/2025-09-ai-tools-unreliable-overconfident-sided.html" },
  { d: "May 2025", o: "Penn State News", t: "Doctoral students honored for AI dissertations", u: "https://ai.psu.edu/doctoral-students-honored-for-ai-dissertations/" },
  { d: "Apr 2025", o: "WPXI-TV", t: "Businesses are increasingly turning to AI to ensure accessibility for people with disabilities. Is it working?", u: "https://www.wpxi.com/news/businesses-are-increasingly-turning-ai-ensure-accessibility-people-with-disabilities-is-it-working/XYS66B3BNFOUBKPK3IA2KTTYKY/" },
  { d: "Nov 2024", o: "Penn State News", t: "Broadcast police communications may pose privacy risks, especially to Black men", u: "https://www.psu.edu/news/research/story/broadcast-police-communications-may-pose-privacy-risks-especially-black-men" },
  { d: "Jun 2024", o: "Mozilla Foundation", t: "Nothing About Us, Without Us: Disability Justice and AI", u: "https://foundation.mozilla.org/en/blog/disability-justice-and-ai/" },
  { d: "Mar 2024", o: "Fast Company", t: "How can we make AI less biased against disabled people", u: "https://www.fastcompany.com/91054056/how-we-can-make-ai-less-biased-against-disabled-people" },
  { d: "Nov 2023", o: "Penn State News", t: "Trained AI models exhibit learned disability bias, IST researchers say", u: "https://www.psu.edu/news/information-sciences-and-technology/story/trained-ai-models-exhibit-learned-disability-bias-ist" },
  { d: "Dec 2023", o: "Tech Xplore", t: "Trained AI models exhibit learned disability bias, researchers say", u: "https://techxplore.com/news/2023-12-ai-disability-bias.html" },
  { d: "Nov 2023", o: "AIhub", t: "A critical survey towards deconstructing sentiment analysis: an interview", u: "https://aihub.org/2023/11/02/a-critical-survey-towards-deconstructing-sentiment-analysis-interview-with-pranav-venkit-and-mukund-srinath/" },
  { d: "Oct 2023", o: "Penn State News", t: "Most websites do not publish privacy policies, researchers say", u: "https://www.psu.edu/news/information-sciences-and-technology/story/most-websites-do-not-publish-privacy-policies-researchers" },
  { d: "Oct 2023", o: "Tech Xplore", t: "Most websites do not publish privacy policies, researchers say", u: "https://techxplore.com/news/2023-10-websites-publish-privacy-policies.html" },
  { d: "Apr 2023", o: "Penn State News", t: "Positive triggering method reduces nationality bias in large text generators", u: "https://www.psu.edu/news/research/story/positive-triggering-method-reduces-nationality-bias-large-text-generators" },
  { d: "Oct 2022", o: "The Hill", t: "Common AI language models show bias against people with disabilities", u: "https://thehill.com/changing-america/respect/diversity-inclusion/3688507-common-ai-language-models-show-bias-against-people-with-disabilities-study/" },
  { d: "Dec 2021", o: "VentureBeat", t: "How bias creeps into the AI designed to detect toxicity", u: "https://venturebeat.com/uncategorized/how-bias-creeps-into-the-ai-designed-to-detect-toxicity/" },
  { d: "May 2021", o: "Penn State News", t: "Study of police language aims to find patterns that may lead to tragic outcomes", u: "https://www.psu.edu/news/research/story/study-police-language-aims-find-patterns-may-lead-tragic-outcomes" },
];

const AWARDS = [
  { y: 2025, t: "Best AI Dissertation — Honorable Mention", o: "Penn State", note: "For the thesis “Society and Bias: Uncovering Automated Prejudices in Sociotechnical NLP Systems.”" },
  { y: 2025, t: "IST Travel Award", o: "Penn State IST", note: "For presenting at EMNLP 2024 in Miami." },
  { y: 2024, t: "Outstanding Reviewer", o: "EMNLP 2024", note: "Selected as one of the outstanding reviewers of the conference." },
  { y: 2024, t: "DEI Recognition Award", o: "CSCW 2024", note: "First-authored analysis of broadcast police communications and its impact on society." },
  { y: 2023, t: "IST Travel Award", o: "Penn State IST", note: "For presenting at EMNLP 2023 in Singapore." },
  { y: 2023, t: "Outstanding Paper Award", o: "EMNLP 2023", note: "“The Sentiment Problem” — a critical survey deconstructing sentiment analysis." },
  { y: 2023, t: "Best Student Paper Award", o: "DocEng 2023", note: "“Privacy Lost and Found” — a web-scale investigation of privacy policy availability." },
  { y: 2023, t: "Best Short Paper Award", o: "TrustNLP @ ACL 2023", note: "“Automated Ableism” — explicit disability bias in sentiment and toxicity models." },
  { y: 2023, t: "Nittany AI Challenge Semifinalist", o: "Penn State", note: "Top 20 team for ChoroNews, a news-based AI timeline summarizer." },
  { y: 2019, t: "HackPSU Winner", o: "HackPSU", note: "Best SaaS Application & Overall Best Application runner-up for Beyond Tweet." },
  { y: 2017, t: "Honeywell Innovation Hackathon", o: "Honeywell", note: "Top innovative product for an AI medical audit model." },
];

const EXPERIENCE = [
  { when: "2025 — now", role: "Research Scientist", org: "Salesforce AI Research · Interactive AI", where: "Palo Alto, CA", pts: ["Deep research and autoresearch: evidence-aware termination, faithful report writing, and citation auditing for enterprise research agents (ACL 2026, ICLR 2026), plus RL-trained reasoning models for diverse scientific ideation.", "AI simulation and persona alignment: socially-grounded personas, interview-grounded simulation (COLM 2026), and long-horizon persona drift in AI companions.", "Agent-to-agent communication and agent evaluation: belief cascades and multimodal persuasion in agent networks (EMNLP 2026), and MLLM-as-a-judge reliability."] },
  { when: "Summer 2024", role: "AI Research Intern", org: "Salesforce AI Research", where: "Palo Alto, CA", pts: ["Mentored by Jason Wu and Philippe Laban.", "Built the Answer Engine Evaluation benchmark to audit RAG systems and answer engines (Perplexity, Bing Copilot) as sociotechnical systems."] },
  { when: "2021 — 2025", role: "Research Assistant", org: "Penn State · Human Language Technologies Lab", where: "University Park, PA", pts: ["Sociodemographic bias in NLP, PII extraction risks from social media, and the Primed to (re)act project on broadcast police communications with UChicago."] },
  { when: "2019 — 2021", role: "Graduate Assistant · Project iOn", org: "Penn State", where: "University Park, PA", pts: ["Collaborative learning with dynamic visualizations; interviews, surveys, and co-design studies."] },
  { when: "2017 — 2019", role: "Application Engineer", org: "Honeywell Technology Solutions", where: "Bangalore, India", pts: ["Chat and process bots, ML integration in engineering operations; led an Enterprise Service Bus that saved ~60 hours of redundant development per week."] },
];

const EDUCATION = [
  { when: "2020 — 2025", what: "Ph.D. in Informatics", where: "Pennsylvania State University", note: "Advised by Dr. Shomir Wilson. Best AI Dissertation, Honorable Mention." },
  { when: "2013 — 2017", what: "B.Tech in Computer Science & Engineering", where: "Amrita School of Engineering", note: "Full-stack development and conversational automation." },
];

const SERVICE = [
  { y: "2025", t: "Area Chair", o: "ACL 2025 · EMNLP 2025" },
  { y: "2025", t: "Program Committee", o: "FAccT 2025 · AIES 2025" },
  { y: "2024", t: "Program Committee", o: "FAccT 2024" },
  { y: "2023", t: "Program Committee", o: "TrustNLP @ ACL 2023" },
  { y: "2022–25", t: "Reviewer", o: "FAccT, EMNLP, ACL, CHI, COLING, Scientific Reports" },
  { y: "2023", t: "Organizer & Volunteer", o: "EMNLP 2023 · FAccT 2023" },
  { y: "—", t: "Project Mentor", o: "NSF Careers Program — “Bias and Fairness in ML: Mitigating Bias in Unstructured Data”" },
  { y: "2020", t: "Vice President", o: "Graduate Student Association in IST (GIST)" },
];

/* Collaborators and mentors, shown on the Research and CV pages. u is optional. */
const COLLABORATORS = [
  { n: "Shomir Wilson", o: "Penn State", u: "https://shomir.net/" },
  { n: "Jason Wu", o: "Salesforce", u: "https://jasonwu0731.github.io/" },
  { n: "Philippe Laban", o: "Salesforce", u: "https://tingofurro.github.io/" },
  { n: "Avijit Ghosh", o: "Hugging Face", u: "https://evijit.github.io/" },
  { n: "Sourojit Ghosh", o: "UNC", u: "https://sourojitghosh.github.io/" },
  { n: "Sanjana Gautam", o: "Microsoft", u: "http://www.sanjanagautam.com/" },
  { n: "Aylin Caliskan", o: "UW", u: "https://faculty.washington.edu/aylin/" },
  { n: "Ioana Baldini", o: "Bloomberg", u: "https://scholar.google.com/citations?user=6Om-j_4AAAAJ&hl=en" },
  { n: "Koustava Goswami", o: "Adobe", u: "https://research.adobe.com/person/koustava-goswami/" },
];

/* Blogs and essays. src = where it was published. */
const BLOGS = [
  { d: "Oct 2025", src: "Salesforce Blog", t: "Towards Trustworthy Enterprise Deep Research", u: "https://www.salesforce.com/blog/trusted-deepresearch/", note: "Co-written with the Salesforce AI Research team: what it takes for deep research agents to be trusted inside an enterprise, from controlled information flow to faithful, well-cited reports." },
  { d: "Sep 2023", src: "AI Monks on Medium", t: "Unveiling the Hidden Impact: How Machine Bias Shapes Our World", u: "https://medium.com/aimonks/unveiling-the-hidden-impact-how-machine-bias-shapes-our-world-d9c3c777c26b", note: "Readers couldn't tell AI-written news about countries from human-written news, yet they rated it as more extreme and remembered its biased details better. A plain-language look at our AIES 2023 study on nationality bias and the Western gaze in AI text." },
  { d: "Jul 2023", src: "Beyond Words and Algorithms on Medium", t: "How a Machine Views the World", u: "https://medium.com/@nlphci.phd/how-a-machine-views-the-world-727c774e0b21", note: "We prompted GPT-2 to write about the people of 194 countries and found that countries with fewer internet users got markedly more negative text. A plain-language take on our EACL 2023 paper on nationality bias in text generation." },
];

/* Talks, tutorials, panels. */
const TALKS = [
  { d: "Aug 2026", t: "Tutorial · Agents in the Wild: Where Research Meets Deployment", o: "KDD 2026 · Jeju, Korea · with G.H. Yang, H. Sedghamiz, E. Santus, V. Dibia, I. Baldini", u: "https://esantus.github.io/agents-in-the-wild-kdd2026/" },
  { d: "Jul 2026", t: "Poster · Don't Stop Early: Scalable Enterprise Deep Research", o: "ACL 2026 · Industry Track", u: "https://aclanthology.org/2026.acl-industry.116/" },
  { d: "Jun 2026", t: "Invited lecture · Evaluating AI Agents in the Era of Benchmarks", o: "Machine Learning Summer School (MLSS) 2026 · Columbia University, NYC", u: "https://cfe.columbia.edu/content/mlss2" },
  { d: "Nov 2024", t: "An Audit on the Perspectives and Challenges of Hallucinations in NLP", o: "EMNLP 2024 · Miami", u: "https://aclanthology.org/2024.emnlp-main.375.pdf" },
  { d: "Oct 2024", t: "Doctoral Consortium · The Need for Inclusive NLP", o: "AIES 2024 · San Jose", u: "https://ojs.aaai.org/index.php/AIES/article/view/31905" },
  { d: "Dec 2023", t: "The Sentiment Problem (Outstanding Paper)", o: "EMNLP 2023 · Singapore", u: "https://aclanthology.org/2023.emnlp-main.848/" },
];

/* Set `email` to show an Email button in the footer and the reach-out section. */
const LINKS = {
  email: "",
  scholar: SCHOLAR,
  x: "https://x.com/PranavVenkit",
  linkedin: "https://www.linkedin.com/in/pranav-venkit/",
  instagram: "https://www.instagram.com/pasdocel/",
  cv: "assets/Pranav_Venkit_CV.pdf",
};

