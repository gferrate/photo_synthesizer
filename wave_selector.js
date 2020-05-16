class WaveSelector {
    constructor(w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.color = color(10, 220, 10, 230);
        this.rollover_color = color(10, 220, 10, 30);
        this.dragging_color = color(10, 220, 10, 80);
        this.point_sep = 6;
        this.point_w = 5;
        this.rollover = false;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    mouse_in_range() {
        if (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h) {
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
        strokeWeight(3);
        stroke(this.color);
        rect(this.x, this.y, this.w, this.h);
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
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }


    draw() {
        if (this.mouse_in_range()) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
        this._update_coordinates();
        this._draw_main_rectangle();
        this._draw_lateral_points();
    }
}