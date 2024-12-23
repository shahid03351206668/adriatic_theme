import json
import frappe


def get_settings():
    return frappe.get_doc("Sidebar Settings", "Sidebar Settings")


@frappe.whitelist()
def get_languages_list():
    languages_data = frappe.db.sql(
        """ SELECT la.custom_flag_image as flag, s.language, la.name as language_id, la.language_name from `tabTheme Setting Language` s  INNER JOIN `tabLanguage` la on la.name = s.language  where 1=1 order by s.idx""",
        as_dict=True,
    )
    frappe.response["languages"] = languages_data


@frappe.whitelist()
def update_settings(request_data):
    request_data = json.loads(request_data)
    settings = get_settings()
    settings.show_logged_username = request_data.get("show_logged_username")
    settings.show_help_dropdown = request_data.get("show_help_dropdown")
    settings.menu_theme_color = request_data.get("menu_theme_color")
    settings.show_language_switcher = request_data.get("show_language_switcher")
    settings.show_breadcrumbs = request_data.get("show_breadcrumbs")
    settings.show_search_box = request_data.get("show_search_box")
    settings.menu_style_type = request_data.get("menu_style_type")
    settings.show_sub_menu_icon = request_data.get("show_sub_menu_icon")
    settings.menu_font_family = request_data.get("menu_font_family")
    settings.show_theme_settings = request_data.get("show_theme_settings")
    settings.language_switcher_type = request_data.get("language_switcher_type")
    settings.sidebar_layout = request_data.get("sidebar_layout")
    # settings.menu_icons_size = request_data.get("menu_icons_size")

    settings.menu_icon_size = request_data.get("menu_icon_size")
    settings.menu_font_size = request_data.get("menu_font_size")
    settings.menu_font_weight = request_data.get("menu_font_weight")

    settings.theme_setting_language = []

    for i in request_data.get("languages", []):
        settings.append("theme_setting_language", {"language": i.get("language_id")})

    update_menu(request_data.get("menu", []), settings)

    for i in settings.theme_colors:
        if i.theme_name == request_data.get("theme_name"):
            i.selected = True
        else:
            i.selected = False

    settings.flags.ignore_permissions = True
    settings.save()


@frappe.whitelist(allow_guest=True)
def get():
    settings = get_settings()
    root_labels = []
    for i in settings.get("navbar"):
        if not i.get("parent_label"):
            root_labels.append(
                {
                    "icon": i.get("icon", "folder-normal"),
                    "url": i.get("url"),
                    "role": i.get("role"),
                    "label": i.get("label"),
                    "parent_label": i.get("parent_label"),
                }
            )

    menu_list = []
    for i in root_labels:
        row = {**i, "sub_menus": []}
        for j in settings.get("navbar"):
            if j.get("parent_label") == i.get("label"):
                row["sub_menus"].append(
                    {
                        "icon": j.get("icon", "folder-normal"),
                        "url": j.get("url"),
                        "role": j.get("role"),
                        "label": j.get("label"),
                        "parent_label": j.get("parent_label"),
                    }
                )
        menu_list.append(row)

    frappe.response["menu"] = menu_list


def update_menu(data, settings):
    menus = []
    for i in data:
        menus.append(
            {
                "role": i.get("role", ""),
                "parent_label": i.get("parent_label", ""),
                "label": i.get("label", ""),
                "icon": i.get("icon", ""),
                "url": i.get("url", ""),
            }
        )
        for j in i.get("sub_menus", []):
            menus.append(
                {
                    "role": j.get("role", ""),
                    "parent_label": j.get("parent_label", ""),
                    "label": j.get("label", ""),
                    "icon": j.get("icon", ""),
                    "url": j.get("url", ""),
                }
            )

    settings.navbar = []
    for i in menus:
        settings.append("navbar", i)
