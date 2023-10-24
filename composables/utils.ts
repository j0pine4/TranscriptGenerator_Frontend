export function useUtils() {

    const videoIdParse = (url: string) => {

        let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        let match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return "Transcript could not be generated for this video"
        }
    
    }

    const parseDate = (date: string) => {
        let newDate = new Date(date);
        return newDate.toDateString();
    } 

    const parseDescription = (description: string) => {
        if(description.length > 30){
            return `${description.slice(0,30)}...`
        } else {
            return description
        }
    } 

    const removeModals = () => {
        let ModalOverlay = document.querySelector('[data-hs-overlay-backdrop-template]');
        ModalOverlay?.remove();

        // Remove the overflow hidden from body
        let body = document.body;
        body.style.overflow = 'auto'
    }

    return {
        videoIdParse,
        parseDate,
        removeModals,
        parseDescription
    }
}