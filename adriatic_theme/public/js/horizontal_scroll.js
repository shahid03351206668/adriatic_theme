console.log("horizontal")

function applyCustomStyles() {
    // $(".main-section").css("overflow-x", "hidden");
    // $('.frappe-list .list-row-col').css({
    //     'min-width': '120px',
    //     'max-width': 'max-content'
    // });

    // $('.list-subject').css({
    //     'min-width': '200px',
    //     'max-width': '200px'
    // });
    // $('.frappe-list').css('overflow-x', 'auto');
    // $('.list-row-head, .list-row-container').css('width', 'max-content');

    // $(".main-section").css("overflow-x", "hidden");
    $('.frappe-list .list-row-col').css({
        'min-width': '120px',
        'max-width': '120px'
    });

    $('.list-subject').css({
        'min-width': '200px',
        'max-width': '200px'
    });
    $('.frappe-list').css('overflow-x', 'auto');
    $('.list-row-head, .list-row-container').css('width', 'max-content');
    $('.list-row, .level-right').css('flex', '0');
    $('.level-right .list-count').css('white-space', 'nowrap');

}

$(document).ready(function () {
    applyCustomStyles();
});
const original_refresh = frappe.views.ListView.prototype.refresh;
frappe.views.ListView.prototype.refresh = function () {
    original_refresh.call(this);
    if (this.columns.length >= 7) {
        applyCustomStyles();
        setTimeout(() => { applyCustomStyles(); }, 500)
    }
};
