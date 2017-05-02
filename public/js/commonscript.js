$('.hamburger-icon').click(function(e) {
    e.preventDefault();
    var nav = $('nav')[0];
    nav.style.maxHeight = nav.style.maxHeight  != '300px' ? '300px' :  '0px';
});


// Create login/register tooltip that appears when the mouse hovers over profile
var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
    var container, timeout;

    originalLeave.call(this, obj);

    if(obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.popover')
        timeout = self.timeout;
        container.one('mouseenter', function() {
            // We entered the actual popover – do not close the tooltip
            clearTimeout(timeout);
            // Let's monitor popover content instead
            container.one('mouseleave', function(){
                $.fn.popover.Constructor.prototype.leave.call(self, self);
            });
        })
    }
};

$('body').popover({ selector: '[data-popover]', trigger: 'hover', placement: 'bottom', delay: {show: 18, hide: 800}, html: true});
