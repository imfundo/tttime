import React from 'react'


let nonDigits = /[^0-9]/g

let labelStyle = {
    width: "7rem",
    display: "inline-block"
};


const parseTime = time => {
    time = time.replace(nonDigits, "");
    return [
        time.substr(0, 2),
        time.substr(2, 2)
    ].map(s => parseInt(s, 10));
}

const getInput = (label, name, type="text") => (
    <div className="row">
        <label style={labelStyle} htmlFor={name}>{label}: </label>
        <input type={type} placeholder={label} name={name} id={name} />
    </div>
);


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

        console.log(date, description, startTime, endTime);

        if (!(date.length === 6 && startTime.length === 4 && endTime.length === 4)) {
            throw "Wrong format in create timelog";
        }

        date = date.replace(nonDigits, "");
        let [day, month, year] = [
            date.substr(0, 2),
            date.substr(2, 2),
            date.substr(4, 4)
        ].map(s => parseInt(s, 10));
        year = year < 100 ? (year + 2000) : year;

        const [startHour, startMinute] = parseTime(startTime);
        const [endHour, endMinute] = parseTime(endTime);

        let nextDayEnd = endHour < startHour || (endHour === startHour && endMinute < startMinute);
        let endDayAdd = nextDayEnd ? 1 : 0;

        let startDate = new Date(year, month - 1, day, startHour, startMinute);
        let endDate = new Date(year, month - 1, day + endDayAdd, endHour, endMinute);

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
                <div className="page-header">
                    <h1>Ny timelog</h1>
                </div>
                <form ref={form => this.form = form} onSubmit={this.onSubmit}>
                    {getInput("Dato", "date", "tel")}
                    {getInput("Beskrivelse", "description")}
                    {getInput("Starttid", "startTime", "tel")}
                    {getInput("Sluttid", "endTime", "tel")}
                    <input type="submit" value="Opret timelog" />
                </form>
            </div>
        )
    }
}



export default CreateTimelog