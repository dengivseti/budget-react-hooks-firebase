import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useMessage } from '../hooks/message.hook'

export const Form = ({payment, onSave, history}) => {
    const [amount, setAmount] = useState(payment ? payment.amount : 0)
    const [type, setType] = useState(payment ? payment.type : 'expense')
    const [category, setCategory] = useState(payment ? payment.category : null)
    const [tags, setTags] = useState(payment ? payment.tags : '')
    const [date, setDate] = useState(payment ? new Date(payment.date) : new Date())
    const [note, setNote] = useState(payment ? payment.note : '')
    const [categories, setCategories] = useState([])
    const id = payment ? payment.id : null
    const messages = useMessage()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        if (type === 'expense') {
            setCategories(['Products', 'Alcohol', 'Entertainment', 'Health', 'Transport', 'Shops'])
        }else{
            setCategories(['Salary', 'Part-time'])
        }
    }, [type])

    const validation = (payment) => {
      if (!payment.amount > 0) {
        messages('Amount > 0')
        return false
      }
      return true
    }

    const saveHandler = event => {
        event.preventDefault()
        const payment = {
          amount: Math.abs(+amount),
          type, 
          category: category ? category : categories[0], 
          date: date.toJSON(),
          tags, 
          note
        }
        if (!validation(payment)){
          return 
        }
        onSave(payment, id)
        history.push('/history')
    }
    

    return (
        <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
              <label htmlFor="amount">Amount</label>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
            <select className="browser-default" value={type} onChange={e => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
            </select>
            </div>
            <div className="col s6">
            <select className="browser-default" onChange={e => setCategory(e.target.value)}>
                {categories.map((category, index) => {
                    return (
                    <option key={index} value={category}>{category}</option>
                    )
                })}
            </select>
            </div>
          </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="tags" type="text" value={tags} onChange={e => setTags(e.target.value)}/>
                <label htmlFor="tags">Tags</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="note" type="text" value={note} onChange={e => setNote(e.target.value)}/>
                <label htmlFor="note">Note</label>
                </div>
            </div>
          <div className="row">
            <div className="col s12">
              Date: &nbsp;
              <DatePicker 
                selected={date}
                onChange={setDate}
              />
            </div>
          </div>
        </form>
        <p className="center-align">
            <a href="/" className="waves-effect waves-light btn-large teal" onClick={saveHandler}>Save</a>
        </p>
      </div>
    )
}