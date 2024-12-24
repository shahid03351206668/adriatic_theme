function make_page_sidebar() {
	const $wrapper = $(`<div class="sidebar-main-content"></div>`);
	$("#page-theme-settings .page-head, #page-theme-settings .container.page-body").wrapAll($wrapper);
	const $pageWrapper = $("#page-theme-settings");
	$pageWrapper.append($(`<div class="sidebar-wrapper" id="cspage-sidebar"> </div>`));
	const sidebarHTML = `<div class="sidebar-navlist">
        <div class="sidebar-navchild active" data-tab-id="layout-settings-tab">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </div>
            <div style="font-size: 1.1rem;">${__("Layout")}</div>
        </div>
        <div class="sidebar-navchild" data-tab-id="navbar-settings-tab">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            </div>
            <div style="font-size: 1.1rem;">${__("Navbar")}</div>
        </div>
        <div class="sidebar-navchild" data-tab-id="menu-settings-tab">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </div>
            <div style="font-size: 1.1rem;">${__("Menu")}</div>
        </div>
        <div class="sidebar-navchild" data-tab-id="fonts-settings-tab">
            <div>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
            </div>
            <div style="font-size: 1.1rem;">${__("Font")}</div>
        </div>
    </div>`

	$pageWrapper.find(".sidebar-wrapper").prepend(sidebarHTML);
	const URLParams = new URLSearchParams(window.location.search);

	$(document).delegate(".sidebar-navchild", "click", function () {
		const tabId = $(this).attr("data-tab-id");
		$(".sidebar-navchild").removeClass("active");
		$(this).addClass("active");
		$(".pg-container.tabs-container .nav-tab").hide();
		$("#" + tabId).show();

		// Update URL parameter
		URLParams.set("current_tab", tabId);
		const newUrl = `${window.location.pathname}?${URLParams.toString()}`;
		history.replaceState(null, "", newUrl);

		console.warn(URLParams.get("current_tab"));
		loadSettings();
	});

}


const checkboxes = [
	"show_language_switcher",
	"show_theme_settings",
	"show_search_box",
	"show_breadcrumbs",
	"show_sub_menu_icon",
	"show_help_dropdown",
	"show_logged_username",
]
const selectField = [
	"language_switcher_type",
	"menu_style_type",
	"menu_icons_size",
	"menu_font_weight",
	"menu_theme_color",
	"menu_font_family",
]

const inputFields = [
	"menu_font_size",
	"menu_icon_size",
]

let SETTINGS_DATA = {
	show_breadcrumbs: 0,
	show_search_box: 0,
	show_theme_settings: 0,
	show_language_switcher: 0,
}
let menuListObject = null;
let LanguageListObject = null;
let CURRENT_THEME_COLOR = "";
frappe.pages['theme-settings'].on_page_load = function ($wrapper) {
	const page = frappe.ui.make_app_page({
		parent: $wrapper,
		title: 'Theme Setting',
		single_column: true
	});

	frappe.require([
		"assets/adriatic_theme/js/bootstrap-toggle.min.js",
		"assets/adriatic_theme/css/bootstrap-toggle.min.css",
		"assets/adriatic_theme/js/Sortable.min.js",
	]).then(d => {



		$($wrapper)
			.find(".row.layout-main")
			.append(`<div class="pg-container tabs-container" style="flex:auto;padding-bottom:4rem;">
	<div class="nav-tab" id="layout-settings-tab">
		<div>
			<div class="text-large font-weight-bold mb-4">${__("Theme Color")}</div>
			<div class="theme-colors-container"></div>
		</div>
		<Br>
		<Br>
		<div>
			<div class="text-large font-weight-bold mb-4">${__("Layout")}</div>
			<div class="layout-options-container">
				<div class="layout-option"  data-option-name="separated">
				
					<img src="/assets/adriatic_theme/assets/layout2.png">
				</div>
				<div class="layout-option" data-option-name="sticked">
					<img src="/assets/adriatic_theme/assets/layout1.png">
				</div>
			</div>
		</div>
		<br><br>
		<div>
			<div class="text-large font-weight-bold mb-2">${__("Menu Styles")}</div>
			<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis settings_field"
				id="menu-style-type" style="width: 150px;" data-fieldname="menu_theme_color">
				<option value="Theme Color">Theme Color</option>
				<option value="Dark">Dark</option>
				<option value="Light">Light</option>
				<option value="Transparent">Transparent</option>
			</select>
		</div>
	</div>

	<div class="nav-tab" id="navbar-settings-tab" style="display: none;">
		<div style="max-width:800px">
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Logged Username")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-logged-username"
					data-fieldname="show_logged_username" class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Help Dropdown")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-help-dropdown" data-fieldname="show_help_dropdown"
					class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Theme Settings")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-theme-settings"
					data-fieldname="show_theme_settings" class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Breadcrumbs")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-breadcrumbs" data-fieldname="show_breadcrumbs"
					class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Search Box")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-search-box" data-fieldname="show_search_box"
					class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Show Language Switcher")}</div>
				<input type="checkbox" data-toggle="toggle" id="show-language-switcher"
					data-fieldname="show_language_switcher" class="settings_field">
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Language Switcher Type")}</div>
				<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis settings_field"
					id="language_switcher_type" style="width: 150px;" data-fieldname="language_switcher_type">
					<option value="Flag With Title">Flag With Title</option>
					<option value="Flag Only">Flag Only</option>
					<option value="Title Only">Title Only</option>
				</select>
			</div>
			<br><br>
			<div class="ml-4">
				<div class="text-large font-weight-bold mb-4">${__("Languages")}</div>
				<div id="languages-list">
				</div>
			</div>
		</div>
	</div>

	<div class="nav-tab" id="menu-settings-tab" style="display: none;">
		<div style="max-width:800px" class="px-4">
			<div class="flex justify-content-between  align-items-center">
				<div class="text-large">${__("Show Sub Modules Icon")}</div>
				<input type="checkbox" class="settings_field" data-toggle="toggle" id="show-sub-modules"
					data-fieldname="show_sub_menu_icon">
			</div>
			<br>
		<div  class="flex justify-content-between  align-items-center">
			<div class="mb-2 text-large">${__("Menu Style")}</div>
			<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis settings_field"
				id="menu-style-type" style="width: 150px;" data-fieldname="menu_style_type">
				<option value="Tree">Tree</option>
				<option value="List">List</option>
			</select>
		</div>

		</div>
		<br><br>
		<div class="menu-container">
			<div class="text-large font-weight-bold ml-4">${__("Menu List")}</div>
			<div id="side-bar-action-table">
				<ul id="list-container"></ul>
				<div class="ml-4">
					<button class="btn btn-primary btn-sm" id="add-menu-item">Add Row</button>
					<button class="btn btn-success btn-sm hide" id="update-menu">Update</button>
				</div>
			</div>
		</div>
	</div>

	<div class="nav-tab" id="fonts-settings-tab" style="display: none;">
		<div style="max-width:800px">

			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Font Family")}</div>
				<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis settings_field"
					id="menu_font_family" style="width: 150px;" data-fieldname="menu_font_family">
					<option value="SFMono-Regular">SFMono-Regular</option>
					<option value="Menlo">Menlo</option>
					<option value="Monaco">Monaco</option>
					<option value="Consolas">Consolas</option>
					<option value="Liberation Mono">Liberation Mono</option>
					<option value="Courier New">Courier New</option>
					<option value="monospace">monospace</option>
					<option value="-apple-system">-apple-system</option>
					<option value="BlinkMacSystemFont">BlinkMacSystemFont</option>
					<option value="Segoe UI">Segoe UI</option>
					<option value="Roboto">Roboto</option>
					<option value="Helvetica Neue">Helvetica Neue</option>
					<option value="Arial">Arial</option>
					<option value="Noto Sans">Noto Sans</option>
					<option value="Liberation Sans">Liberation Sans</option>
					<option value="sans-serif">sans-serif</option>
					<option value="Apple Color Emoji">Apple Color Emoji</option>
					<option value="Segoe UI Emoji">Segoe UI Emoji</option>
					<option value="Segoe UI Symbol">Segoe UI Symbol</option>
					<option value="Noto Color Emoji">Noto Color Emoji</option>
				</select>
			</div>



			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Font Weight")}</div>
				<select type="text" autocomplete="off" class="input-with-feedback form-control ellipsis settings_field"
					id="menu_font_weight" style="width: 150px;" data-fieldname="menu_font_weight">
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
					<option value="400">400</option>
					<option value="500">500</option>
					<option value="600">600</option>
					<option value="700">700</option>
					<option value="800">800</option>
					<option value="900">900</option>
				</select>
			</div>
		
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Font Size")}</div>
				<div class="control-input">
					<input type="text" autocomplete="off" class="input-with-feedback form-control bold settings_field"
						data-fieldname="menu_font_size" style="width: 150px;">
				</div>
			</div>
			<div class="flex justify-content-between px-4 align-items-center mb-3">
				<div class="text-large">${__("Icon Size")}</div>
				<div class="control-input">
					<input type="text" autocomplete="off" class="input-with-feedback form-control bold settings_field"
						data-fieldname="menu_icon_size" style="width: 150px;">
				</div>
			</div>
		</div>
	</div>
</div>`);

		make_page_sidebar();
		const params = new URLSearchParams(window.location.search);
		if (params.get("current_tab")) {
			$(`.sidebar-navchild[data-tab-id="${params.get("current_tab")}"]`).click();

		}
		// handle_theme_color_click()

		menuListObject = new MenuList();
		LanguageListObject = new LanguageListMenu();
		const $addMenuRow = $("#add-menu-item");

		page.set_primary_action(__('Save'), () => {

			frappe.confirm('Are you sure you want to proceed?',
				() => {
					updateSettings()
				}, () => {
					// action to perform if No is selected
				})

		})

		$addMenuRow.click(function () { menuListObject.addRow(); })
		$(document).delegate(".layout-option", "click", function () {
			$(".layout-option").removeClass("active");
			$(this).addClass("active");
			SETTINGS_DATA["sidebar_layout"] = $(this).attr("data-option-name");
		})

		renderThemeColors();
		handleFieldsChange();
		const $menuBtn = $(`<span class="mr-2" id="page-cs-menu-btn">${frappe.utils.icon("menu", "md")}</span>`)
		$menuBtn.click(function (e) {
			e.stopPropagation();
			$(".sidebar-wrapper").addClass("active");
		})

		$(document).click(function (e) {
			if (!$(e.target).closest(".sidebar-wrapper").length && !$(e.target).is($menuBtn)) {
				$(".sidebar-wrapper").removeClass("active");
			}
		});

		$("#page-theme-settings .page-head-content .title-area .flex").prepend($menuBtn);

		setTimeout(() => {
			loadSettings();
		}, 500);

	})
}


function updateSettings() {
	checkboxes.forEach(v => {
		const $field = $(`.settings_field[data-fieldname="${v}"]`);
		if ($field.length) {
			SETTINGS_DATA[v] = $field.is(":checked");
		}
	})

	selectField?.forEach(v => {
		const $field = $(`.settings_field[data-fieldname="${v}"]`);
		if ($field.length) {
			SETTINGS_DATA[v] = $field.val();
		}
	})


	let payload = {
		...SETTINGS_DATA,
		menu: menuListObject?.items,
		theme_name: CURRENT_THEME_COLOR,
		languages: LanguageListObject.languages
	};

	frappe.call({
		method: "adriatic_theme.adriatic_theme.page.theme_settings.api.update_settings",
		freeze: true,
		args: {
			request_data: payload
		},
		callback(res) {
			frappe.msgprint("Settings Updated Sucessfully!");
			window.location.reload();
		}
	})

}

function loadSettings() {
	frappe.dom.freeze();
	frappe.db.get_doc("Sidebar Settings", "Sidebar Settings").then(res => {

		const doc = res;
		const currentTheme = doc.theme_colors.find(v => v.selected);
		SETTINGS_DATA["sidebar_layout"] = doc.sidebar_layout
		// data-option-name="seprated"

		$(`.layout-option[data-option-name="${doc.sidebar_layout}"]`).click();
		if (currentTheme) {
			SETTINGS_DATA["theme_name"] = currentTheme.theme_name;
			$(`.theme-colors-container .theme-color-box[data-theme-name="${currentTheme.theme_name}"]`).click();
		}


		selectField.forEach(v => {
			const value = doc[v];
			SETTINGS_DATA[v] = value;
			$(`select[data-fieldname="${v}"]`).val(value);
		})
		inputFields.forEach(v => {
			const value = doc[v];
			SETTINGS_DATA[v] = value;
			$(`input[data-fieldname="${v}"]`).val(value);
		})

		checkboxes.forEach(v => {
			const value = doc[v];
			SETTINGS_DATA[v] = value;
			if (value) {
				$(`input[data-fieldname="${v}"]`)?.bootstrapToggle('on');
			}
		})
		frappe.dom.unfreeze();
	})
}

function handleFieldsChange() {
	$(document).delegate(".settings_field", "change", function () {
		const $field = $(this);
		const fieldname = $field.attr("data-fieldname")
		if (!fieldname) return;
		if ($field.attr("type") == "checkbox") {
			SETTINGS_DATA[fieldname] = $field.is(':checked');
		}
		else {
			SETTINGS_DATA[fieldname] = $field.val();
		}
	})
}
function renderThemeColors() {
	$(".theme-colors-container").empty();
	frappe.db.get_doc("Sidebar Settings", "Sidebar Settings").then(res => {
		const { theme_colors } = res;
		theme_colors.forEach(v => {
			const $card = $(`<div 
				class="theme-color-box ${v.name == CURRENT_THEME_COLOR ? 'active' : ""}" 
				style="background-color:${v.background_color};color:${v.foreground_color};"
				data-theme-name="${v.theme_name}"
				>
				${v.theme_name}
			</div>`);

			$card.click(function () {
				$(".theme-color-box").removeClass("active");
				CURRENT_THEME_COLOR = v.theme_name;
				$(this).addClass("active");
			})
			$(".theme-colors-container").append($card)
		})

	})
}

class MenuList {
	constructor() {
		this.items = [];
		this.fetchMenuItems().then((data) => {
			this.items = data;
			this.renderMenu();
		})
	}

	update() {
		frappe.call({
			method: "adriatic_theme.adriatic_theme.page.theme_settings.api.update_menu",
			freeze: true,
			args: {
				data: JSON.stringify(this.items),
			},
			callback(response) {
				frappe.msgprint({
					title: __('Message'),
					indicator: 'green',
					message: __('Menu updated successfully')
				});
			}
		})
	}
	fetchMenuItems() {
		return new Promise((resolve, reject) => {
			frappe.call({
				method: "adriatic_theme.adriatic_theme.page.theme_settings.api.get",
				freeze: true,
				callback(response) {
					const { menu } = response;
					resolve(menu);
				}
			})
		})
	}
	renderMenu() {
		const self = this;
		const $listContainer = $("#list-container");
		$listContainer.empty();
		this.items.forEach((item, parentIndex) => {
			const $li = $(`<li class="menu-list-item" >
			<div>
				<div class="flex-list">
					<div>
						<span class="mr-2">${frappe.utils.icon(item.icon || "folder-normal")}</span><span> ${__(item.label)}</span>
					</div>
					<div>
						<button class="btn btn-primary add-row ml-1">${__("Add")}</button>
						<button class="btn btn-info edit-row" >Edit ${frappe.utils.icon("edit-round")}</button>
						<button class="btn remove-row btn-danger ml-1">${frappe.utils.icon("delete")}</button>
						<button class="btn move-parent-row ml-1">${frappe.utils.icon("drag")}</button>
					</div>
				</div>
			</div>
 			<div class="child-list-element"></div>
 			</li>`);
			if (item?.sub_menus?.length) {
				const $cRows = $(`<ul class="ch-menu-wrapper"></ul>`);

				// Loop through each submenu and append it to the parent container
				item?.sub_menus.forEach((val, childIndex) => {
					const $row = $(`
						<li class="ch-menu-element" data-id="${childIndex}">
							<div class="flex-list">
								<div>
									<span class="mr-2">${frappe.utils.icon(val.icon || "folder-normal")}</span>
									<span>${__(val.label)}</span>
								</div>
								<div>
									<button class="btn btn-primary edit-ch-row">Edit ${frappe.utils.icon("edit-round")}</button>
									<button class="btn btn-danger ml-1 delete-sublabel">${frappe.utils.icon("delete")}</button>
									<span class="move-ch-row">${frappe.utils.icon("drag")}</span>
								</div>
							</div>
						</li>
					`);

					$row.find(".edit-ch-row").click(() => {
						self.editChRow(childIndex, parentIndex);
					});
					$row.find(".delete-sublabel").click(() => {
						self.editChRow(childIndex, parentIndex, true);
					});

					$cRows.append($row);
				});

				// Add Sortable.js to the submenu container
				new Sortable($cRows[0], {
					handle: ".move-ch-row", // Only allow drag via the drag handle
					animation: 150,
					onEnd: function (evt) {
						const oldIndex = evt.oldIndex;
						const newIndex = evt.newIndex;

						if (oldIndex !== newIndex) {
							// Move the dragged item in the sub_menus array
							const movedItem = self.items[parentIndex].sub_menus.splice(oldIndex, 1)[0];
							self.items[parentIndex].sub_menus.splice(newIndex, 0, movedItem);

							self.items[parentIndex].sub_menus.forEach((subItem, index) => {
								subItem.idx = index;
							});

							self.renderMenu();
						}
					},
				});

				$li.find(".child-list-element").append($cRows);
			}

			$li.find(".edit-row").click(function () { self.editRow(parentIndex) })
			$li.find(".remove-row").click(function () { self.editRow(parentIndex, true) })
			$li.find(".add-row").click(function () { self.addRow(parentIndex) })
			$listContainer.append($li);

			new Sortable($listContainer[0], {
				handle: ".move-parent-row",
				animation: 150,
				onEnd: function (evt) {
					const oldIndex = evt.oldIndex;
					const newIndex = evt.newIndex;

					if (oldIndex !== newIndex) {
						const movedItem = self.items.splice(oldIndex, 1)[0];
						self.items.splice(newIndex, 0, movedItem);
						self.items.forEach((item, index) => {
							item.idx = index;
						});

						self.renderMenu();
					}
				},
			});
		})

	}
	editChRow(chIndex, parentIndex, remove = false) {
		let rows = this.items[parentIndex]["sub_menus"] || []
		const currentRow = this.items[parentIndex]["sub_menus"][chIndex];

		if (remove) {
			let frows = rows.filter((v, i) => i != chIndex);
			this.items[parentIndex]["sub_menus"] = frows;
			this.renderMenu()
			return;
		}
		else {
			const _this = this;
			const dialog = new frappe.ui.Dialog({
				title: __("Edit"),
				fields: [
					{
						label: __("Label"),
						fieldname: "label",
						fieldtype: "Data",
						reqd: 1,
						default: currentRow.label,
					},
					{
						label: __("Role"),
						fieldname: "role",
						fieldtype: "Link",
						options: "Role",
						reqd: 1,
						default: currentRow.role,
					},
					{
						label: __("Icon"),
						fieldname: "icon",
						fieldtype: "Icon",
						default: currentRow.icon || "",
					},
					{
						label: __("Url"),
						fieldname: "url",
						fieldtype: "Data",
						default: currentRow.url || "",
					},
				],
				size: "medium",
				primary_action_label: __("Update"),
				primary_action(values) {
					_this.items[parentIndex]["sub_menus"][chIndex].label = values.label || "";
					_this.items[parentIndex]["sub_menus"][chIndex].icon = values.icon || "";
					_this.items[parentIndex]["sub_menus"][chIndex].url = values.url || "";
					_this.items[parentIndex]["sub_menus"][chIndex].role = values.role || "";
					_this.renderMenu();
					dialog.hide();
				},
			});
			dialog.show();
		}
	}

	addRow(parentId = null) {
		const self = this
		const dialog = new frappe.ui.Dialog({
			title: __("Add Item"),
			fields: [
				{
					label: __("Label"),
					fieldname: "label",
					fieldtype: "Data",
					reqd: 1,
				},
				{
					label: __("Role"),
					fieldname: "role",
					fieldtype: "Link",
					options: "Role",
					reqd: 1,
				},
				{
					label: __("Icon"),
					fieldname: "icon",
					fieldtype: "Icon",
				},
				{
					label: __("Url"),
					fieldname: "url",
					fieldtype: "Data",
				},
			],
			size: "medium",
			primary_action_label: __("Submit"),
			primary_action(values) {
				let row = {
					idx: self.items.length,
					label: values.label,
					icon: values.icon,
					role: values.role,
					url: values.url,
				};

				if (parentId) {
					if (!self.items[parentId].sub_menus) {
						self.items[parentId].sub_menus = [];
					}

					self.items[parentId].sub_menus?.push(row);
				}
				else {
					row.sub_menus = []
					self.items.push(row);
				}
				dialog.hide();
				self.renderMenu();
			},
		});
		dialog.show();
	}

	editRow(parentIndex, remove = false) {
		if (remove) {
			const filtered = this.items.filter((v, i) => parentIndex != i)
			this.items = filtered;
			this.renderMenu();
		}
		else {
			const self = this;
			const currentItem = this?.items[parentIndex];

			const dialog = new frappe.ui.Dialog({
				title: __("Edit"),
				fields: [
					{
						label: __("Label"),
						fieldname: "label",
						fieldtype: "Data",
						reqd: 1,
						default: currentItem.label,
					},
					{
						label: __("Role"),
						fieldname: "role",
						fieldtype: "Link",
						options: "Role",
						reqd: 1,
						default: currentItem.role,
					},
					{
						label: __("Icon"),
						fieldname: "icon",
						fieldtype: "Icon",
						default: currentItem.icon || "",
					},
					{
						label: __("Url"),
						fieldname: "url",
						reqd: 1,
						fieldtype: "Data",
						default: currentItem.url || "",
					},
				],
				size: "medium",
				primary_action_label: __("Save Changes"),
				primary_action(values) {
					const row = self.items[parentIndex];
					self.items[parentIndex] = { ...row, ...values }
					self.renderMenu();
					dialog.hide();
				},
			});

			dialog.show();
		}
	}
}

class LanguageListMenu {
	constructor() {
		this.languages = [];
		this.setup_languages_list()
	}
	setup_languages_list() {
		const self = this;
		frappe.call({
			method: "adriatic_theme.adriatic_theme.page.theme_settings.api.get_languages_list",
			freeze: true,
			args: {},
			callback(response) {
				const { languages } = response;
				self.languages = languages;
				self.render_languages_list()
			}
		})
	}
	addLanguage() {
		const self = this;
		let d = new frappe.ui.Dialog({
			title: 'Add',
			fields: [
				{
					label: __('Language'),
					fieldname: 'language',
					fieldtype: 'Link',
					options: 'Language',
					reqd: true
				},
			],
			size: 'small',
			primary_action_label: __('Save'),
			primary_action(values) {
				frappe.db.get_value("Language", values.language, ["custom_flag_image", "language_name"]).then(res => {
					const { message } = res;
					self.languages.push({ language_name: message.language_name, flag: message.custom_flag_image, language_id: values.language });
					self.render_languages_list();
					d.hide();
				});
			}
		});
		d.show();
	}
	render_languages_list() {
		const self = this;
		$("#languages-list").empty();

		const $listContainer = $(`<div class="languages-list"></div>`)
		const $listContainerOptions = $(`<ul class="languages-options"></ul>`)
		self.languages.forEach((val, i) => {
			const $opt = $(`<li class='languages-list-options'>
		<div>
			<img style="width:1.5rem;object-fit: contain;" src="${val.flag || "https://cdn-icons-png.flaticon.com/512/2958/2958792.png"}">
			${val?.language_name}
			<svg class="es-icon icon-xs">
				<use href="#es-line-down"></use>
			</svg>
		</div>
		<div>
		<button class="btn btn-delete btn-danger">${frappe.utils.icon("delete")}</button>
		<button class="btn move-language-row">${frappe.utils.icon("drag")}</button>
		</div>
		</li>`)

			$opt.find(".btn-delete").click(function () {
				self.removeLanguage(i);
			})
			$listContainerOptions.append($opt);

		})

		new Sortable($listContainerOptions[0], {
			handle: ".move-language-row",
			animation: 150,
			onEnd: function (evt) {
				const oldIndex = evt.oldIndex;
				const newIndex = evt.newIndex;

				if (oldIndex !== newIndex) {
					const movedItem = self.languages.splice(oldIndex, 1)[0];
					self.languages.splice(newIndex, 0, movedItem);
					self.render_languages_list();
				}
			},
		});
		$listContainer.append($listContainerOptions);
		$("#languages-list").append($listContainer);
		const $btnAdd = $(`<button class="btn btn-sm btn-primary mt-2">${__("Add Language")}</button>`)
		$btnAdd.click(function () {
			self.addLanguage();
		})
		$("#languages-list").append($btnAdd);
	}
	removeLanguage(index) {
		const f = this.languages.filter((v, i) => i != index);
		this.languages = f;
		this.render_languages_list()

	}
}