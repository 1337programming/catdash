#include "./compress-worker.h"

#include <uv.h>
#include <node_buffer.h>
#include <node_version.h>
#include <snappy.h>

#include <string.h>  // memcpy

#include <string>

CompressWorker::~CompressWorker() {
  delete input;
}

void CompressWorker::Execute() {
  snappy::Compress(input->data(), input->length(), &dst);
}

void CompressWorker::HandleOkCallback() {
  Nan::HandleScope scope;

  v8::Local <v8::Object> res = Nan::NewBuffer(dst.length()).ToLocalChecked();
  memcpy(node::Buffer::Data(res), dst.c_str(), dst.length());

  v8::Local <v8::Value> argv[] = {
    Nan::Null(), res
  };

  callback->Call(2, argv);
}