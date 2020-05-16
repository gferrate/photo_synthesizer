class WaveSelector {
    constructor(w, h, x, y, c) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        if (c == 'green') {
            this.color = color(10, 220, 10);
            this.rollover_color = color(10, 220, 10, 30);
            this.dragging_color = color(10, 220, 10, 80);
        } else if (c == 'red') {
            this.color = color(220, 10, 10);
            this.rollover_color = color(220, 10, 10, 30);
            this.dragging_color = color(220, 10, 10, 80);
        }
        this.point_sep = 6;
        this.point_w = 5;
        this.rollover = false;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.resizing = false;
        this.resizingL = false;
        this.resizingR = false;
        this.resizingT = false;
        this.resizingB = false;
        this.xBeforeDragging = 0;
        this.wBeforeDragging = 0;
        this.yBeforeDragging = 0;
        this.hBeforeDragging = 0;
    }

    mouse_in_range() {
        if (mouseX > this.x - 5 && mouseX < this.x + this.w + 5 &&
            mouseY > this.y - 5 && mouseY < this.y + this.h + 5) {
            return true;
        }
        return false;
    }

    _draw_main_rectangle() {
        if (this.rollover && !this.dragging) {
            fill(this.rollover_color);
        } else if (this.dragging) {
            fill(this.dragging_color);
        } else {
            noFill();
        }
        strokeWeight(2);
        stroke(this.color);
        rect(this.x, this.y, this.w, this.h);
    }

    _draw_horizontal_line() {
        strokeWeight(1);
        stroke(this.color);
        line(this.x, this.y + this.h / 2, this.x + this.w, this.y + this.h / 2);
    }

    _draw_lateral_points() {
        stroke(this.color);
        strokeWeight(this.point_w);
        // Left points
        point(this.x, this.y + (this.h / 2 - this.point_sep));
        point(this.x, this.y + (this.h / 2));
        point(this.x, this.y + (this.h / 2 + this.point_sep));

        // Right points
        point(this.x + this.w, this.y + (this.h / 2 - this.point_sep));
        point(this.x + this.w, this.y + (this.h / 2));
        point(this.x + this.w, this.y + (this.h / 2 + this.point_sep));

        // Top points
        point(this.x + (this.w / 2 - this.point_sep), this.y);
        point(this.x + (this.w / 2), this.y);
        point(this.x + (this.w / 2 + this.point_sep), this.y);

        // Bottom points
        point(this.x + (this.w / 2 - this.point_sep), this.y + this.h);
        point(this.x + (this.w / 2), this.y + this.h);
        point(this.x + (this.w / 2 + this.point_sep), this.y + this.h);
    }

    _update_coordinates() {
        if (!this.resizing) {
            if (this.dragging) {
                this.x = mouseX + this.offsetX;
                this.y = mouseY + this.offsetY;
            }
        }
    }

    _in_left_corner() {
        if (mouseX > this.x - 5 &&
            mouseX < this.x + 5 &&
            mouseY > (this.y + this.h / 2) - 9 &&
            mouseY < (this.y + this.h / 2) + 9) {
            return true;
        }
        return false;
    }

    _in_right_corner() {
        if (mouseX > this.x + this.w - 5 &&
            mouseX < this.x + this.w + 5 &&
            mouseY > (this.y + this.h / 2) - 9 &&
            mouseY < (this.y + this.h / 2) + 9) {
            return true;
        }
        return false;
    }

    _in_top_corner() {
        if (mouseX > this.x + this.w / 2 - 9 &&
            mouseX < this.x + this.w / 2 + 9 &&
            mouseY > this.y - 5 &&
            mouseY < this.y + 5) {
            return true;
        }
        return false;
    }

    _in_bottom_corner() {
        if (mouseX > this.x + this.w / 2 - 9 &&
            mouseX < this.x + this.w / 2 + 9 &&
            mouseY > this.y + this.h - 5 &&
            mouseY < this.y + this.h + 5) {
            return true;
        }
        return false;
    }

    set_mouse_pressed() {
        if (this.rollover) {
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            this.xBeforeDragging = this.x;
            this.wBeforeDragging = this.w;
            this.yBeforeDragging = this.y;
            this.hBeforeDragging = this.h;
            this.dragging = true;
        }
    }

    set_mouse_released() {
        this.dragging = false;
        this.resizing = false;
        this.resizingL = false;
        this.resizingR = false;
        this.resizingT = false;
        this.resizingB = false;

    }

    _handle_resizing() {
        if (this._in_left_corner() || this._in_right_corner() || this._in_top_corner() || this._in_bottom_corner()) {
            cursor(CROSS);
        }
        if (this.resizingL) {
            if (mouseX > this.xBeforeDragging + this.wBeforeDragging - 30) {
                return
            }
            this.x = mouseX;
            this.w = (this.xBeforeDragging - mouseX) + this.wBeforeDragging;
            return
        } else if (this.resizingR) {
            if (mouseX < this.xBeforeDragging + 30) {
                return
            }
            this.w = this.wBeforeDragging + (mouseX - (this.wBeforeDragging + this.xBeforeDragging));
            return
        } else if (this.resizingT) {
            if (mouseY > this.yBeforeDragging + this.hBeforeDragging - 30) {
                return
            }
            this.y = mouseY;
            this.h = (this.yBeforeDragging - mouseY) + this.hBeforeDragging;
            return
        } else if (this.resizingB) {
            if (mouseY < this.yBeforeDragging + 30) {
                return
            }
            this.h = this.hBeforeDragging + (mouseY - (this.hBeforeDragging + this.yBeforeDragging));
            return
        }
        if (this.dragging && this._in_left_corner()) {
            this.resizingL = true;
            this.resizing = true;
        } else if (this.dragging && this._in_right_corner()) {
            this.resizingR = true;
            this.resizing = true;
        } else if (this.dragging && this._in_top_corner()) {
            this.resizingT = true;
            this.resizing = true;
        } else if (this.dragging && this._in_bottom_corner()) {
            this.resizingB = true;
            this.resizing = true;
        } else {
            this.resizing = false;
        }
    }

    draw() {
        if (this.mouse_in_range()) {
            cursor('grab');
            this.rollover = true;
        } else {
            cursor();
            this.rollover = false;
        }
        this._handle_resizing();
        this._update_coordinates();
        this._draw_main_rectangle();
        this._draw_horizontal_line();
        this._draw_lateral_points();
    }
}