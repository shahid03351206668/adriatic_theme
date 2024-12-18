
class Sidebar {
    constructor() {
        this.$body = $("#body");
        this.iconSize = "sm"
        this.downArrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`;
        this.upArrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><path d="m18 15-6-6-6 6"/></svg>`

        this.sidebarLinks = [];

        this.fetch_sidebar_data().then((response) => {
            const { settings, data } = response;
            this.iconSize = settings.menu_icons_size || "sm";
            this.sidebarLinks = data;
            this.sidebarSettings = settings;

            frappe.run_serially([
                () => this.make_container(settings?.menu_theme_color, settings?.sidebar_layout),
                () => this.render_sidebar(),
            ])
        })

    }
    setup_mobile_menu() {
        const self = this
        if (!$("#mobile-menu-btn").length) {

            const $menuBtn = $(`<div id="mobile-menu-btn" >${frappe.utils.icon("menu", 'md')}</div>`);
            $menuBtn.click(function () {
                self.$sidebarWrapper.toggleClass("show-mobile");
            })

            $(".navbar.navbar-expand .container").prepend($menuBtn);
        }

    }
    render_sidebar() {
        const $sidebar = $(`<div class="pg-sidebar"></div>`);
        const $nav = $(`<div class="pg-sidebar__nav"></div>`);

        this.sidebarLinks?.forEach(val => {
            $nav.append(this.make_nav_element(val));
        })

        $sidebar.append($nav);
        this.$sidebarWrapper.append($sidebar);
    }
    fetch_sidebar_data() {
        return new Promise(function (resolve, reject,) {
            frappe.call({
                method: "adriatic_theme.api.get_sidebar_data",
                freeze: true,
                callback(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error)
                }
            })
        })
    }

    load_sidebar_links() {
        return new Promise(function (resolve, reject,) {
            frappe.call({
                method: "adriatic_theme.api.get_sidebar_data",
                callback(response) {
                    const { data } = response;
                    resolve(data);
                },
                error(error) {
                    reject(error)
                }
            })
        })
    }
    make_nav_element(data, showIcon = true) {
        const $wrapper = $(`<div class="pg-sidebar__nav-wrapper ${window.location.pathname == data.url ? "active" : ""} "></div>`)
        let $element = $(`<div class="pg-sidebar__nav-element">
            
            <div class="element-icon ${!showIcon ? "hide" : ""}">
            ${frappe.utils.icon(data?.icon || "folder-normal",)}
            </div>
                <div class="element-label">${__(data.label)}</div>
            </div>`);


        if (data.childs) {
            const $childs = $(`<div class="pg-sidebar__nav-childs hide"></div>`)
            data.childs.forEach(child => {
                $childs.append(this.make_nav_element(child, this.sidebarSettings?.show_sub_menu_icon))
            })

            $wrapper.append($childs)
            $element = $(`<div class="pg-sidebar__nav-element">
            <div class="element-icon ${!showIcon ? "hide" : ""} ">
                ${frappe.utils.icon(data?.icon || "folder-normal")}
            </div>
                <div class="element-label__wrapper">
                    <div class="element-label">${__(data.label)}</div>
                    <div class="nav-element-action">
                        ${this.downArrowIcon}
                    </div>
                </div>
            </div>
            `);

            const _this = this;

            $element.find(".nav-element-action").click(function () {
                _this.handle_navitem_click($(this));
            })
        }

        $element.click(function () {
            $(".pg-sidebar__nav-element").removeClass("active");
            $element.addClass("active");
            frappe.set_route(data.url);
        })

        $wrapper.prepend($element);
        return $wrapper;
    }

    handle_navitem_click($button) {
        const $childWrapper = $button.parent().parent().parent().find(".pg-sidebar__nav-childs");
        $childWrapper.toggleClass("hide");
        if ($childWrapper.hasClass("hide")) {
            $button.html(this.downArrowIcon);
        }
        else {
            $button.html(this.upArrowIcon);
        }
    }

    make_container(theme_type, layout) {
        const sidebarCSSVariables = `
        --sidebar-color: ${this.sidebarSettings?.background_color};
        --sidebar-text-color: ${this.sidebarSettings?.foreground_color};
        --bg-color-hover: ${this.sidebarSettings?.background_color_hover};
        --sidebar-font-size: ${this.sidebarSettings?.menu_font_size}px;
        --sidebar-font-weight: ${this.sidebarSettings?.menu_font_weight};
        --sidebar-font-family: ${this.sidebarSettings?.menu_font_family};
        --sidebar-icon-size: ${this.sidebarSettings?.menu_icon_size}px;`

        const $wrapper = $(`<div style="display: flex; position:relative;" >`);
        this.$body.wrap($wrapper);
        this.$body.addClass("col");
        this.$sidebarWrapper = $(`<div class="left-main-sidebar">
                <button class="close-btn hidden-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>
                    </svg>
                </button>
            </div>`).insertBefore(this.$body);

        if (layout == "separated") {
            this.$sidebarWrapper.addClass("separated");
        }
        if (theme_type === "Theme Color") {
            this.$sidebarWrapper.addClass("menu-theme");
            this.$sidebarWrapper.get(0).style.cssText = sidebarCSSVariables + `--icon-stroke: ${this.sidebarSettings?.foreground_color} !important;`;
        }
        else if (theme_type === "Dark") {
            this.$sidebarWrapper.addClass("dark");

        }
        const _this = this;
        this.$sidebarWrapper.find(".close-btn").click(function () {
            _this.$sidebarWrapper.find(".pg-sidebar").toggleClass("collapsed");

        })

        const element = document?.querySelector(`[data-theme=light]`);
        element.style.cssText = `--listview-color-bg: ${this.sidebarSettings?.listview_background};
        --listview-color: ${this.sidebarSettings?.listview_color};
        --btn-primary: ${this.sidebarSettings?.background_color};
        --theme-primary-color-bg: ${this.sidebarSettings?.background_color};  ${sidebarCSSVariables}`;
        // console.log(this.$sidebarWrapper)

        // document?.querySelector(`[data - theme= light]`)?.style.cssText = `--listview - color - bg: ${ this.sidebarSettings?.listview_background };
        // --listview-color: ${this.sidebarSettings?.listview_color};
        // --btn-primary: ${this.sidebarSettings?.background_color};
        // `;
        this.setup_mobile_menu();
    }
}




class LanguagePicker {
    constructor(type, languages) {
        this.languages = languages;
        this.type = type;
        this.setup_picker();
    }
    setup_picker() {
        const data = this.languages;
        console.log(data)
        if ($("#language-picker").length) {
            return;
        }
        const currentLanguage = data?.find((val) => val.language_id === frappe.boot.user.language);
        if (!currentLanguage) { return }

        let hide_flag = "";
        let hide_title = ""
        if (this.type == "Flag Only") { hide_title = "hidden" }
        else if (this.type == "Title Only") { hide_flag = "hidden" }

        const $picker = $(`<li class="nav-item dropdown d-lg-block show" id="language-picker">
                <button class="btn-reset nav-link" data-toggle="dropdown" aria-controls="languge-picker" aria-label="languge Picker"
                    aria-expanded="true">
                    <span>
                    <img class="${hide_flag} language-picker-label-image"  style="" src="${currentLanguage.flag || "https://cdn-icons-png.flaticon.com/512/2958/2958792.png"}">
                    <span class="hidden-sm">${currentLanguage?.language_name}</span>
                     <svg class="es-icon icon-xs"><use href="#es-line-down"></use></svg> </span>
                </button>
                <div class="dropdown-menu dropdown-menu-right " id="languge-picker" role="menu"></div>
        </li>`)

        const $pickerOptions = $picker.find("#languge-picker");

        data?.forEach(row => {
            const $opt = $(`<div class="dropdown-item">
            <div class="flex align-items-center language-picker-option" >
            <img class="${hide_flag}" style="width:1.5rem;object-fit: contain;" src="${row.flag || "https://cdn-icons-png.flaticon.com/512/2958/2958792.png"}"> <div class="ml-2 ${hide_title}">${row?.language_name}</div></div></div>`);

            $opt.click(() => {
                frappe.dom.freeze();
                frappe.db.set_value("User", frappe.session.user, { language: row.language_id }).then(res => {
                    frappe.dom.unfreeze();
                    frappe.msgprint("Updating the language", "Updating")
                    window.location.reload();
                })
            });
            $pickerOptions.append($opt);
        });
        this.render_picker($picker);

    }
    render_picker($picker) {
        $(".navbar .navbar-collapse .navbar-nav").prepend($picker);
    }
}


class AdriaticTheme {
    constructor() {
        this.languagePicker = null;
        this.sidebar = new Sidebar();
        this.languages = [];
        this.apply_theme_settings();
        frappe.router.on('change', () => {
            this.apply_theme_settings();
            this.setup_search_bar();
        })
    }

    setup_search_bar() {
        console.log(window.screen.width)
        if (window.screen.width <= 768) {
            // return;

            // console.log("setting search bar")
            if ($("#search-box-wrapper").length) {
                return;
            }

            const $wrapper = $(`<div id="search-box-wrapper"></div>`);
            const $openSearchBoxBtn = $(`<div class='open-search-box'>${frappe.utils.icon("search", "md")}</div>`);
            const $searchBar = $(`.form-inline[role="search"]`);
            $searchBar.wrap($wrapper);
            $searchBar.parent().append($openSearchBoxBtn);
            $openSearchBoxBtn.click(function () {
                $searchBar.show();
                $openSearchBoxBtn.hide();
                $(".dropdown-notifications.dropdown-mobile").hide();
                $("#language-picker").hide();
            })

            $searchBar.hide();
            $(document).on("click", function (event) {

                const isClickInsideSearchBar = $searchBar.is(event.target) || $searchBar.has(event.target).length > 0;
                const isClickOnOpenButton = $openSearchBoxBtn.is(event.target) || $openSearchBoxBtn.has(event.target).length > 0;

                if (!isClickInsideSearchBar && !isClickOnOpenButton) {
                    $searchBar.hide();
                    $openSearchBoxBtn.show();
                    $(".dropdown-notifications.dropdown-mobile").show();
                    $("#language-picker").show();
                }
            });
        }
    }
    remove_workspace_sidebar() {
        $("#page-Workspaces .col-lg-2.layout-side-section").remove();
        $("#page-Workspaces .btn-reset.sidebar-toggle-btn").remove();
    }
    get_theme_settings() {
        return new Promise((resolve, reject) => {
            frappe.call({
                method: "adriatic_theme.api.get_theme_data",
                args: {},
                callback(response) {
                    resolve(response);
                }
            })
        })
    }
    insert_settings_option() {
        if ($("#nav-theme-settings").length) { return }
        $(".navbar .navbar-collapse .navbar-nav .nav-item:nth-child(2)").after(`<li class="nav-item">
            <a class="nav-link notifications-icon text-muted" href="/app/theme-settings?current_tab=layout-settings-tab"  id="nav-theme-settings" data-original-title="theme-settings">${frappe.utils.icon("setting-gear", "md")}</a></li>`)

    }
    apply_theme_settings() {
        this.remove_workspace_sidebar();
        this.get_theme_settings().then(response => {
            const { languages } = response;
            this.languages = languages;
            const {
                show_search_box,
                show_language_switcher,
                show_theme_settings,
                language_switcher_type,
                show_help_dropdown,
                show_breadcrumbs,
                show_logged_username,
            } = response.data;

            if (!show_help_dropdown) {
                $(".nav-item.dropdown-help").remove();
            }

            if (!show_breadcrumbs) {
                $("#navbar-breadcrumbs").remove();
            }
            if (!show_search_box) {
                $(".search-bar").remove();
            }

            if (show_language_switcher && languages?.length) {
                this.languagePicker = new LanguagePicker(language_switcher_type, languages);
            }

            if (show_theme_settings) { this.insert_settings_option() }
            if (show_logged_username) { this.setup_user_profile_icon() }
            this.setup_search_bar()
        })
    }

    setup_user_profile_icon() {
        if ($("#profile-badge-wrapper")?.length) { return }
        const $menuButton = $(".dropdown-navbar-user .btn-reset.nav-link");
        const $wrapper = $(`<div class=" menu-btn-wrapper flex justify-content-between align-items-center" id="profile-badge-wrapper" ></div> `);
        $menuButton.find(".avatar").wrap($wrapper);
        $menuButton.find(".menu-btn-wrapper").append($(`<div div class="ml-2 hidden-sm"> ${frappe.session.user_fullname}</div > `))
    }
}

window.webTheme = new AdriaticTheme();

