import React from 'react'


export default function Modal({title, text, buttons, children}) {
    return (
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{text}</p>
                        {children || ""}
                    </div>
                    <div class="modal-footer">
                        {buttons}
                    </div>
                </div>
            </div>
        </div>
    )
}
