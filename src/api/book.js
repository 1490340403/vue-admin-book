import request from '@/utils/request'

export function bookCreate(data) {
  return request({
    url: 'book/create',
    method: 'post',
    data
  })
}
export function categoryList(){
  return request({
    url:'/book/category',
    method:'get'
  })
}
export function getList(data){
  return request({
    url:'/book/list',
    method:'get',
    params:data
  })
}