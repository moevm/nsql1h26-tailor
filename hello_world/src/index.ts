/**
 * @file index.ts
 * @description Файл содержит демонстрационный код для подключения к MongoDB серверу,
 * выполнения базовых операций с базой данных и коллекцией.
 * @author KorzikAlex
 * @license ISC
 */
import { MongoClient } from 'mongodb'

const host = 'localhost' // Имя хоста MongoDB сервера
const port = 27017 // Порт MongoDB сервера
const url = `mongodb://${host}:${port}` // URL для подключения к MongoDB

const dbName = 'hello_world_db' // Имя базы данных, к которой будем подключаться
const collectionName = 'messages' // Имя коллекции, с которой будем работать

const mongoClient = new MongoClient(url) // Создаем экземпляр MongoClient для подключения к MongoDB

/**
 * @function main
 * @async
 *
 * @description Основная функция приложения, которая инициирует подключение к MongoDB серверу.
 */
async function main() {
  console.log('URL:', url) // Выводим URL подключения для отладки

  await mongoClient.connect() // Подключаемся к MongoDB серверу и обрабатываем результат подключения

  console.log('Подключение к MongoDB серверу успешно установлено.\n')

  const db = mongoClient.db(dbName) // Получаем объект базы данных для дальнейших операций
  const collection = db.collection(collectionName) // Получаем объект коллекции для выполнения операций с данными

  // Удаляем все документы из коллекции для чистого тестирования
  const deleteResult = await collection.deleteMany({})
  console.log('Удаленные документы =>', deleteResult, '\n')

  // Вставляем несколько документов в коллекцию и выводим результат вставки
  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }])
  console.log('Вставленные документы =>', insertResult, '\n')

  // Находим все документы в коллекции и выводим их на консоль
  const findResult = await collection.find({}).toArray()
  console.log('Найденные документы =>', findResult, '\n')

  // Завершаем работу приложения и выводим сообщение об успешном завершении
  return 'Приложение успешно завершило выполнение.'
}

// Запускаем основную функцию приложения
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoClient.close())
