function applyCustomStyles($page) {
    if (!window.innerWidth >= 768) {
        return
    }
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

    $page.find('.frappe-list .list-row-col').css({
        'min-width': '120px',
        'max-width': '120px'
    });

    $page.find('.list-subject').css({
        'min-width': '200px',
        'max-width': '200px'
    });
    $page.find('.frappe-list').css('overflow-x', 'auto');
    $page.find('.list-row-head, .list-row-container').css('width', 'max-content');
    // $page.find('.list-row, .level-right').css('flex', '0');
    $page.find('.level-right .list-count').css('white-space', 'nowrap');

}

const original_refresh = frappe.views.ListView.prototype.refresh;
frappe.views.ListView.prototype.refresh = function (listview) {
    original_refresh.call(this);
    const $page = this.$page;
    if (!$page) return;
    if (this.columns.length >= 8) {
        let i = 0
        while (i < 5) {
            applyCustomStyles($page);
            setTimeout(() => {
                applyCustomStyles($page)
            }, 1000);
            i++;
        }
    }
};
