// data/save-export-data.js

// Detect the current page
const page = document.body.getAttribute('data-page');

// Define page-specific IDs
const ids = {
    save_export_data: {
        loadSaves: 'load-saves',
        exportData: 'export-data',
        editors: 'editors'
    }
};

const pageIds = ids[page] || {};

let savesData = {
    latest_export_data: null,
    previous_export_data: []
};

function loadSavesJson(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                savesData = JSON.parse(e.target.result);
                if (!savesData.latest_export_data || !Array.isArray(savesData.previous_export_data)) {
                    throw new Error("Invalid saves.json format.");
                }
                alert("Saves.json loaded successfully.");
            } catch (error) {
                alert("Error loading saves.json: " + error.message);
                savesData = { latest_export_data: null, previous_export_data: [] };
            }
        };
        reader.readAsText(file);
    }
}

function exportSavesJson() {
    const exportDataText = document.getElementById(pageIds.exportData).value.trim();
    let newExportData;
    try {
        if (!exportDataText) {
            newExportData = { saves: [] };
        } else {
            newExportData = JSON.parse(exportDataText);
            if (!newExportData.saves || !Array.isArray(newExportData.saves)) {
                throw new Error("Invalid export data format.");
            }
        }
    } catch (error) {
        alert("Error parsing export data: " + error.message);
        return;
    }

    if (savesData.latest_export_data) {
        savesData.previous_export_data.unshift(savesData.latest_export_data);
        if (savesData.previous_export_data.length > 5) {
            savesData.previous_export_data = savesData.previous_export_data.slice(0, 5);
        }
    }

    savesData.latest_export_data = {
        export_timestamp: new Date().toISOString(),
        saves: newExportData.saves
    };

    const json = JSON.stringify(savesData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saves.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('New saves.json exported successfully.');
}

async function exportAllFiles() {
    const filesToExport = [
        'index.html', 'simulators.html', 'stories.html', 'templates.html',
        'logs.html', 'storytelling.html', 'save-export-data.html', 'to-do-list.html',
        'code_modifier.html', 'styles.css', 'data/stories.css', 'data/index.css',
        'script.js', 'autosave.js', 'data/stories.js', 'data/index.js'
    ];

    const fileContents = await Promise.all(filesToExport.map(async (file) => {
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to fetch ${file}`);
            const content = await response.text();
            return `--- ${file}\n${content}`;
        } catch (error) {
            return `--- ${file}\n[Error: Could not fetch file]`;
        }
    }));

    const combinedContent = fileContents.join('\n\n');
    const blob = new Blob([combinedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'combined_code.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize page
if (page === 'save_export_data') {
    console.log("Save Export Data page initialized");
}