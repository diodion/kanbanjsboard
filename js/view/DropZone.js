export default class DropZone {
    static createDropZone () {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
        <div class="kanban__arraste"></div>
        `).children[0];
        
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__arraste--ativo");
        }); 

        dropZone.addEventListener("dragleave", ()=> {
            dropZone.classList.remove("kanban__arraste--ativo");
        });
    
        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__arraste--ativo");
        
            const columnElement = dropZone.closest(".kanban__coluna");
            const columnId = Number(columnElement.dataset.id);

            console.log(columnElement, columnId);
        });

        return dropZone;
    }
}