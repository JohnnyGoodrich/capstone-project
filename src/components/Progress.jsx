import React from "react"


const Progress = () => {
    return (
        <div>
            <div class="cntainer-fluid">
                <div class="progress">
                    <label class="progress-label col-xs-3" > Total memory:</label>
                    <div class="progress-bar progress-bar-striped active col-xs-9" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "10%" }}>
                        40% Complete (success)
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Progress