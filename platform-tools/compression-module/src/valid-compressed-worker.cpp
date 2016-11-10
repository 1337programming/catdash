#include "./valid-compressed-worker.h"

#include <uv.h>
#include <node_buffer.h>
#include <node_version.h>
#include <snappy.h>

#include <string.h>  // memcpy

#include <string>

IsValidCompressedWorker::~IsValidCompressedWorker() {
  delete input;
}

void IsValidCompressedWorker::Execute() {
  res = snappy::IsValidCompressedBuffer(input->data(), input->length());
}

void IsValidCompressedWorker::HandleOkCallback() {
  Nan::HandleScope scope;

  v8::Local <v8::Value> argv[] = {
    Nan::Null(), res ? Nan::True() : Nan::False()
  };

  callback->Call(2, argv);
}