import React, { useEffect } from 'react'
import { useState } from 'react'
import s from './App.module.css' 

const initArr = ['border', 'gap', 'float', 'color']
const obj = {
	'border': 'Задает границы елементу.',
	'gap': 'Задает отступы между элементами.',
	'float': 'Задает обтекаемость текста.',
	'color': 'Задает цвет тексту.',
}
function App() {
	const [inpValue, setInpValue] = useState('')
	const [item, setItem] = useState(initArr)
	const [cssDisc, setCssDisc] = useState('')
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Добавим состояние для кнопки
	const [indexArr, setIndexArr] = useState('')
	const [result, setResult] = useState('')
	const [isWrong, setIsWrong] = useState(s.inp)
	const [count, setCount] = useState('')
	const [isRunning, setIsRunning] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)
	const [sum, setSum] = useState(0)
	
	useEffect(() => {
		if(isRunning) {
			const intervalId = setInterval(() => {
				if(count > 0) {
					setCount(count - 1)
				  } else {
					clearInterval(intervalId)
					setCount('Время вышло.')
					setIsRunning(false)
					setIsDisabled(true)
					setIsWrong(s.inp)
					setInpValue('')
				  }
			  }, 1000)
			  return () => clearInterval(intervalId)
		}
	}, [count, isRunning])
	

	useEffect(() => {
		if (cssDisc.length) {
			nextCss()
		  }
	}, [item, cssDisc])

	function handleInput(event) {
		if(!cssDisc.length) {
			setInpValue('')
		} else {
			setInpValue(event.target.value)
		}
	}

	function getRnd() {
		return Math.floor(Math.random() * item.length)
	}

	function nextCss() {
		const index = getRnd()
		setCssDisc(obj[item[index]])
		setIndexArr(index)
		if(item.length === 0) {
			setItem(initArr)
			setCssDisc('')
			setResult('Вы прошли весь тест!')
			setIsRunning(false)
			setCount('')
			const input = document.querySelector('input')
			input.blur()
		}
	}
	function pressEnter(event) {
		if(event.key === 'Enter') {
			if(inpValue.trim().toLocaleLowerCase() === item[indexArr]) {
				let copy = Object.assign([], item)
				copy.splice(indexArr, 1)
				setItem(copy)
				setIsWrong(s.inp)
				setSum(sum + 1)
			} 
			if(inpValue.trim().toLocaleLowerCase() !== item[indexArr]) {
				setIsWrong(s.active)
			}
			if(!cssDisc.length) {
				setIsWrong(s.inp)
			}
			setInpValue('');
		}
	}
	// Кнопка "Старт"
	function handleStart() {
		setIsRunning(true) // Запускает таймер
		const index = getRnd() // Генерирует случайный вопрос
		setCssDisc(obj[item[index]]) // Текущий вопрос
		setIsButtonDisabled(true); // Отключаем кнопку после старта
		setIndexArr(index) // Индекс CSS свойства в массиве
		setIsWrong(s.inp) // Убирает фон неправильного ответа в инпуте
		setCount(30) // Задает время таймеру в секундах
		const input = document.querySelector('input') // Задает фокус инпуту
		input.focus()
	}
	function clear() {
		setItem(initArr) // Возвращается все вопросы
		setIsButtonDisabled(false) // Делает кнопку "Старт" активной
		setCssDisc('') // Убирает описание вопроса
		setResult('') // Сбразывает результат теста
		setCount('') // Убирает показания счетчика
		setIsDisabled(false) // Делает активным инпут
		setIsRunning(false) // Останавливает счетчик
		setIsWrong(s.inp) // Убирает фон неправильного ответа в инпуте
		setInpValue('') // Очищает инпут
		const input = document.querySelector('input') // Убирает фокус с инпута
		input.blur()
	}
	return (
		<div className={s.wrapper}>
			<h1>
				Тренажер CSS свойств
			</h1>
			<p>
				Нажмите "Старт" чтобы начать тестирование.<br/>
				В поле ниже введите название CSS свойства и нажмите Enter.<br/>
				Если ответ введен верно, появится описание следующего СSS свойства, если нет, нужно найти верный ответ.<br/>
				Следующий вопрос появится только после ввода правильного ответа.<br/>
			</p>
			<button onClick={handleStart} disabled={isButtonDisabled}>
				Старт
			</button>
			<p>
				{cssDisc}
			</p>
			<input className={isWrong} value={inpValue} 
					onChange={event => handleInput(event)} 
					onKeyDown={event => pressEnter(event)}
					disabled={isDisabled}
			/> <br/><br/>
			<div>
				{sum} из {initArr.length}
			</div>
			<p>
				{result} {count}
			</p>
			<button onClick={clear}>Сброс</button>
		</div>
	)
}

export default App



