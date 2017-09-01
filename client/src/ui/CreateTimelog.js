import React from 'react'


let nonDigits = /[^0-9]/g

let parseTime = time => {
    time = time.replace(nonDigits, "");

}

let labelStyle = {
    width: "7rem",
    display: "inline-block"
};


class CreateTimelog extends React.Component {

    getFieldValues() {
        return Array.from(this.form.querySelectorAll(".row input")).reduce((fields, input) => {
            fields[input.getAttribute("name")] = input.value.trim();
            return fields;
        }, {});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { onCreate } = this.props;
        let { date, description, startTime, endTime } = this.getFieldValues();

        if (!(date.length === 6 && startTime.length === 4 && endTime.length === 4)) {
            throw "Wrong format in create timelog";
        }

        date = date.replace(nonDigits, "");
        let [day, month, year] = [
            date.substr(0, 2),
            date.substr(2, 2),
            date.substr(4, 4)
        ].map(s => parseInt(s, 10));
        year = year < 100 ? (year+2000) : year;

        startTime = startTime.replace(nonDigits, "");
        let [startHour, startMinute] = [
            startTime.substr(0, 2),
            startTime.substr(2, 2)
        ].map(s => parseInt(s, 10));

        endTime = endTime.replace(nonDigits, "");
        let [endHour, endMinute] = [
            endTime.substr(0, 2),
            endTime.substr(2, 2)
        ].map(s => parseInt(s, 10));

        let nextDayEnd = endHour < startHour || (endHour === startHour && endMinute < startMinute);
        let endDayAdd = nextDayEnd ? 1 : 0;

        let startDate = new Date(year, month-1, day, startHour, startMinute);
        let endDate = new Date(year, month-1, day+endDayAdd, endHour, endMinute);

        onCreate({
            id: Math.random(),
            start: startDate,
            end: endDate,
            description,
            category: "none"
        });
    }

    render() {
        return (
            <div className="create-timelog">
                <h1>Ny timelog</h1>
                <form ref={form => this.form = form} onSubmit={this.onSubmit}>
                    <div className="row">
                        <label style={labelStyle}>Dato: </label>
                        <input type="tel" name="date" />
                    </div>

                    <div className="row">
                        <label style={labelStyle}>Beskrivelse: </label>
                        <input type="text" name="description" />
                    </div>

                    <div className="row">
                        <label style={labelStyle}>Starttid: </label>
                        <input type="tel" name="startTime" />
                    </div>

                    <div className="row">
                        <label style={labelStyle}>Sluttid: </label>
                        <input type="tel" name="endTime" />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}



export default CreateTimelog