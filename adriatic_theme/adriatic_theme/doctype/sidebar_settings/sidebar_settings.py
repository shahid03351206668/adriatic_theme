# Copyright (c) 2024, Codes Soft and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class SidebarSettings(Document):
    def validate(self):
        for i in self.theme_colors:
            if i.selected:
                self.background_color = i.background_color
                self.background_color_hover = i.background_color_hover
                self.foreground_color = i.foreground_color
                self.listview_background = i.listview_background
                self.listview_color = i.listview_color
