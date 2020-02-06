export function createDescription(str: string, limit: any = false): string {
    let cleanStr = str.replace(/(<([^>]+)>)/ig,"");

    if (limit) {
        cleanStr = cleanStr.length > limit ? `${cleanStr.substring(0, limit)}...` : cleanStr.substring(0, limit);
    }

    return cleanStr;
}

interface ScrollSpyerInterface {
  elementsToWatchOnScroll: string;
  classToAdd: string;
  classToAddOnRemove: string;
  desiredViewportHeightPercentage: number;
  offsetTop: number;
}

export function scrollSpyer(scrollingElement: string, config?: Partial<ScrollSpyerInterface>): any {
    const defaultConfig: ScrollSpyerInterface = {
        elementsToWatchOnScroll: ".animate-on-scroll",
        classToAdd: "fadeIn",
        classToAddOnRemove: "fadeOut",
        desiredViewportHeightPercentage: .75,
        offsetTop: 0,
    };

    const finalConfig = {
      ...defaultConfig,
      ...config
    };

    // define this
    const $this: any = document.querySelector(scrollingElement) || window;
    // the elements that we want to animate
    const elementsToWatchOnScroll = document.querySelectorAll(finalConfig.elementsToWatchOnScroll);
    // defines the distance the scroll is from top and the previous value for this
    let distanceTop = 0;
    let previousDistance = 0;
    // defines scroll direction, initialLoad is needed to trigger animation on page load
    let isScrollDown = true;
    let isInitialLoad = true;
    // Gets the viewport height
    const viewportHeight = $this.offsetHeight;
    // defines the desired distance for when animation should trigger
    const desiredViewportHeight = viewportHeight * finalConfig.desiredViewportHeightPercentage;

    const spy = () => {
        if(elementsToWatchOnScroll.length > 0) {
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
            for(const index in elementsToWatchOnScroll) {
                if(!isNaN(index as any)) {
                    // the individual element to animate
                    const $element: any = elementsToWatchOnScroll[index];
                    // determine distance element is from top of screen
                    const fromTop = $element.offsetTop - $this.scrollTop;

                    // determine if we are scrolling down or this is initial load
                    if(isScrollDown || isInitialLoad) {
                      // is the element closer to the top than the desired trigger point
                      if(fromTop < desiredViewportHeight) {
                        let $elementClassList: any = [];
                        // create the array from the nodelist
                        $element.classList.forEach((item: any) => $elementClassList.push(item));
                        // remove the class
                        $elementClassList = $elementClassList.filter((e: any) => e !== finalConfig.classToAddOnRemove);
                        if($elementClassList.indexOf(finalConfig.classToAdd) === -1) {
                          // add the animate class
                          $elementClassList.push(finalConfig.classToAdd);
                        }
                        // assign the classNames
                        $element.className = $elementClassList.join(" ");
                      }
                    } else {
                      // is the element farther from the top than the desired trigger point
                      if(fromTop > desiredViewportHeight) {
                        let $elementClassList: any = [];
                        // create the array from the nodelist
                        $element.classList.forEach((item: any) => $elementClassList.push(item));
                        // remove the class
                        $elementClassList = $elementClassList.filter((e: any) => e !== finalConfig.classToAdd);
                        if($elementClassList.indexOf(finalConfig.classToAddOnRemove) === -1) {
                          // add the animate class
                          $elementClassList.push(finalConfig.classToAddOnRemove);
                        }
                        // assign the classNames
                        $element.className = $elementClassList.join(" ");
                      }
                    }
                }
            };
        }
    };

    spy();
    $this.addEventListener("scroll", () => {
        spy();
    });
    isInitialLoad = false;

    return spy;
}

const buildClassString = (isUp: boolean, classList: [], classToAdd: string, classToRemove: string): string => {
  let $elementClassList: any = [];
  // create the array from the nodelist
  classList.forEach((item: any) => $elementClassList.push(item));

  // remove the class
  $elementClassList = $elementClassList.filter((e: any) => e !== isUp ? classToAdd : classToRemove);
  if($elementClassList.indexOf(isUp ? classToRemove : classToAdd) === -1) {
    // add the animate class
    $elementClassList.push(isUp ? classToRemove : classToAdd);
  }

  // assign the classNames
  return $elementClassList.join(" ");
};
