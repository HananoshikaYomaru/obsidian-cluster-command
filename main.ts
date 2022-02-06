import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, ToggleComponent } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	showDryRunCommands : boolean 
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	showDryRunCommands : false 
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		addCommands(this)
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

function addCommands (plugin : Plugin ) { 
	const prefix = "cluster-command"
	plugin.addCommand ({
		id : `${prefix}-propagate-this` , 
		name : "propagate this note", 
		callback : () => { 
			throw new Error("not implmeneted ")
		}
	}) 

	plugin.addCommand ( { 
		id : `${prefix}-propagate-all` , 
		name : "propagate all notes" , 
		callback : () => {
			throw new Error("not implmeneted ")
		}
	}) 

	plugin.addCommand ( { 
		id : `${prefix}-isolate-this` , 
		name : "isolate this cluster" , 
		callback : () => { 
			throw new Error ("not implemented") 
		}
	})

	plugin.addCommand ( { 
		id : `${prefix}-merge-clusters` , 
		name  : "merge some clusters" , 
		callback : () => { 
			throw new Error("not implmeneted ")
		}
	})

	plugin.addCommand( { 
		id : `${prefix}-`
	})
} 


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		new Setting(this.containerEl)
			.setName('Show Dry Run Commands')
			.setDesc('Dry run commands run your commands, showing the expected result but not actually changing the content.')
			.addToggle((toggle) => {
				toggle.onChange(async value => { 
					this.plugin .settings.showDryRunCommands  = value 
					await this.plugin.saveSettings ();
				})
			})
	}
}
