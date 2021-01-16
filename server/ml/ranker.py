# -*- coding: utf-8 -*-
import argparse
import torch
import torchvision.models
import torchvision.transforms as transforms

class Ranker:
    def __init__(self):
        self.device = 'cpu'

        self.model = torchvision.models.resnet50()
        self.model.fc = torch.nn.Linear(in_features=2048, out_features=1)
        self.model.load_state_dict(torch.load('ml/model/model-resnet50.pth', map_location=self.device)) 
        self.model.eval().to(self.device)

    def prepare_image(self, image):
        if image.mode != 'RGB':
            image = image.convert("RGB")
        Transform = transforms.Compose([
                    transforms.Resize([224,224]),      
                    transforms.ToTensor(),
                ])
        image = Transform(image)   
        image = image.unsqueeze(0)
        return image.to(self.device)

    def predict(self, image):
        image = self.prepare_image(image)
        with torch.no_grad():
            preds = self.model(image)
        return preds.item()
