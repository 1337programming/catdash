#include "./uncompress-worker.h"

#include <node_buffer.h>
#include <node_version.h>
#include <snappy.h>

#include <string.h>  // memcpy

#include <string>

UncompressWorker::~UncompressWorker() {
  delete input;
}

void UncompressWorker::Execute() {
  if (!snappy::Uncompress(input->data(), input->length(), &dst))
    SetErrorMessage("Invalid input");
}

void UncompressWorker::HanldeOkCallback() {
  Nan::HandleScope scope;

  v8::Local<v8::Value> res;
  if (asBuffer) {
    res = Nan::NewBuffer(dst.length()).ToLocalChecked();
    memcpy(node::Buffer::Data(res.As<v8::Object>()), dst.c_str(), dst.length());
  } else {
    res = Nan::New<v8::String>(dst.c_str(), dst.length()).ToLocalChecked();
  }

  v8::Local<v8::Value> argv[] = {
    Nan::Null()
    , res
  };

  callback->Call(2, argv);
}