<script>
    let filename;
    export let saveFile;
    export let closeModal;
    
</script>

<div class='modal-overlay'>
    <div class='modal'>
        <label for='filename'>Filename</label>
        <input type='text' id='filename' bind:value={filename} />
        <div class='buttons-container'>
            <button on:click={closeModal}>Cancel</button>
            <button on:click={saveFile(filename)}>Save</button>
        </div>
    </div>
</div>

<style lang='scss'>

    .modal-overlay {
        display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
        background-color: rgba(0, 0, 0, 0.26);
        position: fixed;
        width: 100%;
        height: 100%;

        .modal {
            width: 300px;
            max-width: 95%;
            height: 130px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5px 20px;
            box-sizing: border-box;
            border-radius: 5px;
            
            .buttons-container {
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;

                button {
                    padding: 2px 20px;

                    &:first-of-type {
                        margin-right: 10px;
                    }

                    &:last-of-type {
                        background-color: #278ea5;
                        color: #ffffff;
                        border: transparent;
                    }
                }
            }
        }
    }
</style>