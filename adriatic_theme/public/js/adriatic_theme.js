console.warn("js")
class Sidebar {
    constructor() {
        this.$body = $("#body");
        this.downArrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`;
        this.upArrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><path d="m18 15-6-6-6 6"/></svg>`

        this.sidebarLinks = [];

        this.fetch_sidebar_data().then((response) => {
            const { settings, data } = response;
            this.sidebarLinks = data;
            this.sidebarSettings = settings;
            frappe.run_serially([
                () => this.make_container(),
                () => this.render_sidebar(),
            ])
        })

    }

    render_sidebar() {
        const $sidebar = $(`<div class="pg-sidebar"></div>`);
        const $nav = $(`<div class="pg-sidebar__nav"></div>`);

        console.log(this.sidebarLinks);
        this.sidebarLinks?.forEach(val => {
            $nav.append(this.make_nav_element(val));
        })
        // this.load_sidebar_links().then((data) => {
        // })

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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-house">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path
                        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                    </path>
                </svg>
            </div>
                <div class="element-label">${data.label}</div>
            </div>`);


        if (data.childs) {
            const $childs = $(`<div class="pg-sidebar__nav-childs hide"></div>`)
            data.childs.forEach(child => {
                $childs.append(this.make_nav_element(child, this.sidebarSettings?.show_sub_menu_icon))
            })

            $wrapper.append($childs)

            $element = $(`<div class="pg-sidebar__nav-element">
            <div class="element-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-house">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path
                        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                    </path>
                </svg>
            </div>
                <div class="element-label__wrapper">
                    <div class="element-label">${data.label}</div>
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

    make_container() {
        const $wrapper = $(`<div style="display: flex" >`);
        this.$body.wrap($wrapper);
        this.$body.addClass("col");
        this.$sidebarWrapper = $(`<div class="left-main-sidebar"
            style="
            --sidebar-color: ${this.sidebarSettings?.background_color};
            --sidebar-text-color: ${this.sidebarSettings?.foreground_color};
            --bg-color-hover: ${this.sidebarSettings?.background_color_hover};
            --sidebar-font-size: ${this.sidebarSettings?.menu_font_size}px;
            --sidebar-font-weight: ${this.sidebarSettings?.menu_font_weight};
            --sidebar-font-family: ${this.sidebarSettings?.menu_font_family};
            --sidebar-icon-size: ${this.sidebarSettings?.menu_icon_size}px;"
            >
            
                <button class="close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>
                    </svg>
                </button>
            </div>`).insertBefore(this.$body);

        const _this = this;
        this.$sidebarWrapper.find(".close-btn").click(function () {
            _this.$sidebarWrapper.find(".pg-sidebar").toggleClass("collapsed");

        })

    }
}

window.LeftSidebar = new Sidebar();


// const $menuButton = $(".dropdown-navbar-user .btn-reset.nav-link");
// const $wrapper = $(`<div class=" menu-btn-wrapper flex justify-content-between align-items-center" ></div>`);
// $menuButton.find(".avatar").wrap($wrapper);
// $menuButton.find(".menu-btn-wrapper").append($(`<div class="ml-2">${frappe.session.user_fullname}</div>`))
