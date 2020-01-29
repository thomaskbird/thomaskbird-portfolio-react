export function createDescription(str: string, limit: any = false): string {
    let cleanStr = str.replace(/(<([^>]+)>)/ig,"");

    if (limit) {
        cleanStr = cleanStr.length > limit ? `${cleanStr.substring(0, limit)}...` : cleanStr.substring(0, limit);
    }

    return cleanStr;
}

export function scrollSpyer(elementToWatch: string): void {
    const config = {
        elementsToWatchOnScroll: ".animate-on-scroll",
        classToAdd: "expandIn",
        classToAddOnRemove: "expandIn",
        desiredViewportHeightPercentage: .5,
    };

    setTimeout(() => {
        // define this
        const $this: any = document.querySelector(elementToWatch) || window;
        // the elements that we want to animate
        const elementsToWatchOnScroll = document.querySelectorAll(config.elementsToWatchOnScroll);
        // defines the distance the scroll is from top and the previous value for this
        let distanceTop = 0;
        let previousDistance = 0;
        // defines scroll direction, initialLoad is needed to trigger animation on page load
        let isScrollDown = true;
        let isInitialLoad = true;
        // Gets the viewport height
        const viewportHeight = $this.offsetHeight;
        // defines the desired distance for when animation should trigger
        const desiredViewportHeight = viewportHeight * config.desiredViewportHeightPercentage;

        const spy = () => {
            // current distance from the top
            distanceTop = $this.scrollTop;

            // determine and set the scroll direction
            if(distanceTop > previousDistance) {
                isScrollDown = true;
            } else {
                isScrollDown = false;
            }

            // set the previousDistance for later use
            previousDistance = distanceTop;

            // iterate through elements to animate
            for(let i = 0; i < elementsToWatchOnScroll.length; i++) {
                // the individual element to animate
                const $element: any = elementsToWatchOnScroll[i];
                // determine distance element is from top of screen
                const fromTop = $element.offsetHeight - $this.scrollTop;

                // determine if we are scrolling down or this is initial load
                if(isScrollDown || isInitialLoad) {
                    // is the element closer to the top than the desired trigger point
                    if(fromTop < desiredViewportHeight) {
                        const $elementClassList: any = [];
                        // create the array from the nodelist
                        $element.classList.forEach((item: any) => $elementClassList.push(item));
                        // add the animate class
                        $elementClassList.push(config.classToAdd);
                        // remove the class
                        $elementClassList.filter((e: any) => e !== config.classToAddOnRemove);
                        // assign the classNames
                        $element.className = $elementClassList.join(" ");
                    }
                } else {
                    // is the element farther from the top than the desired trigger point
                    if(fromTop > desiredViewportHeight) {
                        const $elementClassList: any = [];
                        // create the array from the nodelist
                        $element.classList.forEach((item: any) => $elementClassList.push(item));
                        // add the animate class
                        $elementClassList.push(config.classToAddOnRemove);
                        // remove the class
                        $elementClassList.filter((e: any) => e !== config.classToAdd);
                        // assign the classNames
                        $element.className = $elementClassList.join(" ");
                    }
                }
            };
        };

        spy();             
        $this.addEventListener("scroll", () => {
            spy();
        });
        isInitialLoad = false;
    }, 4000);
}
