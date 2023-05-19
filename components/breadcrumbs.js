export default function Example() {
  return (
    <div className="pt-8">
      <nav aria-label="breadcrumb"> 
        <ol className="flex space-x-2">
          <li><a href="#" className="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700">~</a></li>
          <li><a href="#" className="after:content-['/'] after:ml-2 text-gray-600 hover:text-purple-700">projects</a></li>
          <li className="text-purple-700" aria-current="page">alyx-bot</li> 
        </ol>
      </nav>
    </div>
  )
}
