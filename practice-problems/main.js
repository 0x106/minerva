// Compression / Decompression

const isNumeric = n => !isNaN(n)

const __decompress = str => {

  if (str[0] === '[') {
    str = str.substr(1, str.length-2)
  }

  let idx = 1
  while(isNumeric(str.substr(0, idx))) idx++

  const value = str.substr(0, idx-1)
  const block = str.substr(idx-1, str.indexOf(']'))

  console.log(value, '-->', block);

  if (value === '' || block === '') return '' // '[ab]' or '42[]'
  if ( !(block.substr(2).indexOf('[') !== -1) ) {

    let output = ''
    let N = Number(value)
    for (let idx=0; idx < N; ++idx) {
      output += block.substr(1, block.length-2)
    }

    return output
  }

  let N = Number(value)
  for (let idx=0; idx < N; ++idx) {
    return decompress(block)
  }
}











const decompress = str => {

  if (str.indexOf('[') === -1) {
    return str
  }

  if (str[0] === '[') {
    return str.substr(1, str.length-2)
  }

  let start = str.indexOf('[')
  let end = str.indexOf(']')

  let value = str.substr(0, start)
  let block = str.substr(start+1, end-start-1)

  let N = Number(value)
  let result = ''
  for (let idx = 0; idx < N; ++idx) {
    result += decompress(block)
  }

  let chunk = str.substr(end+1, str.length-(end-start-1))
  while(chunk !== '') {
    let start = chunk.indexOf('[')
    let end = chunk.indexOf(']')
    let value = chunk.substr(0, start)
    let block = chunk.substr(start+1, end-start-1)

    let N = Number(value)
    for (let idx = 0; idx < N; ++idx) {
      result += decompress(block)
    }
    chunk = chunk.substr(end+1, chunk.length-(end-start-1))

    console.log('-->', str, start, end, value, block, chunk);
  }

  console.log('-->', str, start, end, value, block, chunk);

  return result

}

const devDecompression = _ => {
  let test = '1[abc]pq2[xyz]'
  console.log(decompress( test ))
}















const input = [
  '4[a]', '4[a]2[b]', '4[ab]8[cd]',    // 'aaaa', 'aaaabb', 'ababababcdcdcdcdcdcdcdcd'
  '16[ab]32[cd]',                      // 'abababababababababababababababababababab', 'cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd'
  '2[3[a]b]',                          // 'aaabaaab'
  '2[2[2[2[a]b]]c]',                   // 'aabaabcaabaabc'
  '2[]',                               // ''
  '[]',                                // ''
  '[ab]'                               // ''
]

const output = [
  'aaaa', 'aaaabb', 'ababababcdcdcdcdcdcdcdcd',
  'abababababababababababababababababababab', 'cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd',
  'aaabaaab',
  'aabaabcaabaabc',
  '',
  '',
  ''
]


const runDecompression = _ => {
  console.log(input);
  console.log(output);

  console.log('------------------------------');

  for (let item in input) {
    decompress(input[item])
  }
}

// runDecompression()
devDecompression()
