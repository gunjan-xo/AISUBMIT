// =============================================
//  AI-TOOLS DIRECTORY — script.js
// =============================================

// ---- TOOL DATA (grouped by category) --------

const codeTools = [
    {
        name: "GitHub Copilot",
        description: "AI-powered code completion and suggestion tool built into your editor.",
        category: "Code Assistant",
        url: "https://github.com/features/copilot",
        badge: "Popular"
    },
    {
        name: "Cursor",
        description: "AI-first code editor that understands your codebase and helps you write faster.",
        category: "Code Assistant",
        url: "https://cursor.sh",
        badge: "Trending"
    },
    {
        name: "Bubble",
        description: "No-code platform to build fully functional web apps without writing code.",
        category: "Low-Code/No-Code",
        url: "https://bubble.io",
        badge: ""
    },
    {
        name: "AI2sql",
        description: "Convert plain English into SQL queries instantly using AI.",
        category: "SQL",
        url: "https://www.ai2sql.io",
        badge: ""
    },
    {
        name: "Tabnine",
        description: "AI code completion assistant that learns your coding style and speeds up development.",
        category: "Code Assistant",
        url: "https://www.tabnine.com",
        badge: ""
    },
    {
        name: "Webflow",
        description: "Visual web development platform with AI features for designers and developers.",
        category: "Low-Code/No-Code",
        url: "https://webflow.com",
        badge: ""
    }
];

const textTools = [
    {
        name: "ChatGPT",
        description: "AI chatbot for writing, brainstorming, and productivity by OpenAI.",
        category: "Writing Generators",
        url: "https://chat.openai.com",
        badge: "Popular"
    },
    {
        name: "Jasper AI",
        description: "AI writing assistant for marketing copy, blog posts, and brand content.",
        category: "Copywriting",
        url: "https://www.jasper.ai",
        badge: "Featured"
    },
    {
        name: "QuillBot",
        description: "AI-powered paraphrasing and grammar tool used by millions of writers.",
        category: "Paraphrasing",
        url: "https://quillbot.com",
        badge: ""
    },
    {
        name: "Sudowrite",
        description: "AI writing tool designed specifically for fiction writers and storytellers.",
        category: "Storyteller",
        url: "https://www.sudowrite.com",
        badge: ""
    },
    {
        name: "PromptPerfect",
        description: "Automatically optimize prompts for ChatGPT, Midjourney, and other AI tools.",
        category: "Prompt Generators",
        url: "https://promptperfect.jina.ai",
        badge: ""
    },
    {
        name: "Copy.ai",
        description: "AI-powered copywriting platform for ads, emails, product descriptions, and more.",
        category: "Copywriting",
        url: "https://www.copy.ai",
        badge: ""
    }
];

const imageTools = [
    {
        name: "Midjourney",
        description: "Industry-leading AI image generation tool known for stunning, artistic visuals.",
        category: "Image Generation",
        url: "https://www.midjourney.com",
        badge: "Popular"
    },
    {
        name: "DALL·E 3",
        description: "OpenAI's powerful image generation model, integrated directly into ChatGPT.",
        category: "Image Generation",
        url: "https://openai.com/dall-e-3",
        badge: ""
    },
    {
        name: "Adobe Firefly",
        description: "AI image and design generation tool built into the Adobe Creative Suite.",
        category: "Image Editing",
        url: "https://www.adobe.com/products/firefly.html",
        badge: "Featured"
    },
    {
        name: "Canva AI",
        description: "Design platform with AI-powered image generation and editing features.",
        category: "Art & Design",
        url: "https://www.canva.com",
        badge: ""
    },
    {
        name: "Stable Diffusion",
        description: "Open-source AI image generation model with extensive customization options.",
        category: "Image Generation",
        url: "https://stability.ai",
        badge: ""
    },
    {
        name: "Remove.bg",
        description: "AI-powered background removal tool for images in seconds.",
        category: "Image Editing",
        url: "https://www.remove.bg",
        badge: ""
    }
];

// ---- RENDER TOOL CARDS ----------------------

function renderTools(toolsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    toolsArray.slice(0, 6).forEach(tool => {
        const card = document.createElement("div");
        card.className = "tool-card";
        card.innerHTML = `
            ${tool.badge ? `<span class="tool-badge ${tool.badge.toLowerCase()}">${tool.badge}</span>` : ""}
            <div class="tool-category-label">${tool.category}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.url}" target="_blank" rel="noopener">Visit Tool →</a>
        `;
        container.appendChild(card);
    });
}

// ---- SEARCH FUNCTIONALITY -------------------

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();

        const allTools = [
            ...codeTools.map(t => ({ ...t, gridId: "codeToolsGrid" })),
            ...textTools.map(t => ({ ...t, gridId: "textToolsGrid" })),
            ...imageTools.map(t => ({ ...t, gridId: "imageToolsGrid" }))
        ];

        if (query === "") {
            // Reset to defaults
            renderTools(codeTools, "codeToolsGrid");
            renderTools(textTools, "textToolsGrid");
            renderTools(imageTools, "imageToolsGrid");
            return;
        }

        const filtered = allTools.filter(t =>
            t.name.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query)
        );

        // Clear all grids
        ["codeToolsGrid", "textToolsGrid", "imageToolsGrid"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = "";
        });

        if (filtered.length === 0) {
            const firstGrid = document.getElementById("codeToolsGrid");
            if (firstGrid) {
                firstGrid.innerHTML = `<p class="no-results">No tools found for "<strong>${query}</strong>". Try a different keyword.</p>`;
            }
            return;
        }

        // Group filtered by gridId
        const grouped = {};
        filtered.forEach(tool => {
            if (!grouped[tool.gridId]) grouped[tool.gridId] = [];
            grouped[tool.gridId].push(tool);
        });

        Object.entries(grouped).forEach(([gridId, tools]) => {
            const container = document.getElementById(gridId);
            if (!container) return;
            tools.forEach(tool => {
                const card = document.createElement("div");
                card.className = "tool-card";
                card.innerHTML = `
                    ${tool.badge ? `<span class="tool-badge ${tool.badge.toLowerCase()}">${tool.badge}</span>` : ""}
                    <div class="tool-category-label">${tool.category}</div>
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                    <a href="${tool.url}" target="_blank" rel="noopener">Visit Tool →</a>
                `;
                container.appendChild(card);
            });
        });
    });
}

// ---- FORM SUBMISSION -------------------------

function initForm() {
    const form = document.getElementById("toolForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const msg = document.getElementById("message");
        if (msg) {
            msg.className = "success-message";
            msg.innerText = "✅ Tool submitted successfully! Our team will review it shortly.";
        }
        form.reset();
    });
}

// ---- INIT ------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    renderTools(codeTools, "codeToolsGrid");
    renderTools(textTools, "textToolsGrid");
    renderTools(imageTools, "imageToolsGrid");
    initSearch();
    initForm();
});