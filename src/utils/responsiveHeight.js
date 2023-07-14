export default (setPlHeight, setSbWidth, setSm) => {
    const innerWidth = window.innerWidth;

        if(setSbWidth && setSm) {
            if (innerWidth < 470 && innerWidth > 400) {
                setSbWidth(350);
                setSm(true);
            }
        }

        if(innerWidth > 750) {
            setPlHeight(550)
        }

        if (innerWidth < 750) {
            setPlHeight(400);
        } 

        if (innerWidth < 550) {
            setPlHeight(300);
        }
         
        if (innerWidth < 400) {
            setPlHeight(200);
        } 
}