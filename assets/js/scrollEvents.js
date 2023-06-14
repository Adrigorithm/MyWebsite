"use strict"

class ScrollButtonController{
    constructor(navHeight, toTopButton){
        this.navHeight = navHeight;
        this.toTopButton = toTopButton;
    }

    CalculateVisibilityCheck(currentHeight, updatedNavHeight){
        this.navHeight = updatedNavHeight;
        this.ToggleVisibility(currentHeight > this.navHeight.clientHeight);
    }

    ToggleVisibility(shouldShow){
        shouldShow
        ? this.toTopButton.classList.remove("hidden") 
        : this.toTopButton.classList.add("hidden");
    };
};

export {ScrollButtonController};
